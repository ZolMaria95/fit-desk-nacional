from datetime import datetime
from typing import List

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.database import get_database
from app.schemas.item import ItemCreate, ItemResponse, ItemUpdate

from app.utils.security import get_current_user

router = APIRouter(prefix="/api/items", tags=["items"], dependencies=[Depends(get_current_user)])


def _validate_object_id(item_id: str) -> ObjectId:
    if not ObjectId.is_valid(item_id):
        raise HTTPException(status_code=400, detail="Invalid item id format.")
    return ObjectId(item_id)


@router.get("", response_model=List[ItemResponse])
async def list_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    cursor = db["items"].find().skip(skip).limit(limit)
    items = await cursor.to_list(length=limit)
    return [ItemResponse.model_validate(item) for item in items]


@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(item_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    object_id = _validate_object_id(item_id)
    item = await db["items"].find_one({"_id": object_id})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found.")
    return ItemResponse.model_validate(item)


@router.post("", response_model=ItemResponse, status_code=201)
async def create_item(item_create: ItemCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    item_data = item_create.model_dump()
    item_data["created_at"] = datetime.utcnow()
    result = await db["items"].insert_one(item_data)
    item_data["_id"] = result.inserted_id
    return ItemResponse.model_validate(item_data)


@router.put("/{item_id}", response_model=ItemResponse)
async def update_item(
    item_id: str,
    item_update: ItemUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    object_id = _validate_object_id(item_id)
    update_data = item_update.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="At least one field must be provided for update.")
    update_data["updated_at"] = datetime.utcnow()
    result = await db["items"].update_one({"_id": object_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found.")
    item = await db["items"].find_one({"_id": object_id})
    return ItemResponse.model_validate(item)


@router.delete("/{item_id}", status_code=204)
async def delete_item(item_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    object_id = _validate_object_id(item_id)
    result = await db["items"].delete_one({"_id": object_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found.")
    return None
