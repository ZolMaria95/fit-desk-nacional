from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.config import settings

client: Optional[AsyncIOMotorClient] = None
database: Optional[AsyncIOMotorDatabase] = None


async def connect_to_mongo() -> None:
    global client, database
    client = AsyncIOMotorClient(
        settings.mongodb_uri,
        appname="fit-daily-backend",
        serverSelectionTimeoutMS=5000,
    )
    database = client[settings.database_name]
    await client.admin.command("ping")


async def close_mongo() -> None:
    global client
    if client is not None:
        client.close()
        client = None


def get_database() -> AsyncIOMotorDatabase:
    if database is None:
        raise RuntimeError("MongoDB client is not initialized.")
    return database
