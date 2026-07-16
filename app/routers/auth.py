from datetime import datetime, timedelta

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.database import get_database
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.utils.security import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=201)
async def register_user(
    payload: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    # Bootstrap: only allowed when no users exist yet.
    users_count = await db["users"].count_documents({})
    if users_count > 0:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Registration is disabled after initial bootstrap.",
        )

    existing = await db["users"].find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists.")

    user_doc = {
        "email":           payload.email.lower(),
        "first_name":      payload.first_name,
        "last_name":       payload.last_name,
        "hashed_password": hash_password(payload.password),
        "role":            payload.role or "scrummaster",
        "created_at":      datetime.utcnow(),
    }
    result = await db["users"].insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    return UserResponse.model_validate(user_doc)


@router.post("/users", response_model=UserResponse, status_code=201)
async def create_user_admin(
    payload: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_database),
    caller: dict = Depends(get_current_user),
):
    if caller.get("role") not in ("helpdesk", "scrummaster"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden.")

    existing = await db["users"].find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists.")

    user_doc = {
        "email":           payload.email.lower(),
        "first_name":      payload.first_name,
        "last_name":       payload.last_name,
        "hashed_password": hash_password(payload.password),
        "role":            payload.role or "consultor",
        "created_at":      datetime.utcnow(),
    }
    result = await db["users"].insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    return UserResponse.model_validate(user_doc)


@router.post("/login")
async def login(
    payload: UserLogin,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    user = await db["users"].find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials.")

    token = create_access_token(
        subject=str(user["_id"]),
        expires_delta=timedelta(minutes=60),
    )
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
async def me(current_user: dict = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)
