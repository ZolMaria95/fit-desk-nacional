from datetime import datetime
from typing import Annotated, Any

from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, Field


def _coerce_objectid(value: Any) -> ObjectId:
    if isinstance(value, ObjectId):
        return value
    if isinstance(value, str) and ObjectId.is_valid(value):
        return ObjectId(value)
    raise ValueError(f"Invalid ObjectId value: {value!r}")


PyObjectId = Annotated[ObjectId, BeforeValidator(_coerce_objectid)]


class ItemModel(BaseModel):
    id: PyObjectId = Field(default_factory=ObjectId, alias="_id")
    title: str = Field(..., max_length=200)
    description: str = Field("", max_length=1000)
    completed: bool = Field(False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime | None = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }
