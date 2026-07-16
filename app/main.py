from pathlib import Path
from typing import Callable

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import ValidationError
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import close_mongo, connect_to_mongo, get_database
from app.routers.items import router as items_router
from app.routers.auth import router as auth_router

STATIC_DIR = Path(__file__).resolve().parent.parent / "static"


class MaxRequestSizeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable):
        content_length = request.headers.get("content-length")
        if content_length is not None:
            try:
                size = int(content_length)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid Content-Length header.")
            if size > 1_000_000:
                raise HTTPException(status_code=413, detail="Request body too large.")
        return await call_next(request)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        return response


async def lifespan(app: FastAPI):
    await connect_to_mongo()
    # create important indexes (idempotent)
    try:
        db = get_database()
        await db["users"].create_index("email", unique=True)
        await db["items"].create_index([("sprintId", 1)])
    except Exception:
        pass
    yield
    await close_mongo()


docs_enabled = settings.environment == "development"

app = FastAPI(
    title="FitDaily Backend",
    version="1.0.0",
    docs_url="/docs" if docs_enabled else None,
    redoc_url="/redoc" if docs_enabled else None,
    openapi_url="/openapi.json" if docs_enabled else None,
    lifespan=lifespan,
)

app.add_middleware(MaxRequestSizeMiddleware)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.include_router(items_router)
app.include_router(auth_router)


@app.get("/", response_class=FileResponse)
async def root():
    index_file = STATIC_DIR / "index.html"
    if not index_file.exists():
        raise HTTPException(status_code=404, detail="Static index file not found.")
    return index_file


@app.get("/health")
async def health():
    return JSONResponse(content={"status": "ok", "environment": settings.environment})
