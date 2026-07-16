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


class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=ObjectId, alias="_id")
    email: str
    first_name: str = Field(..., max_length=100)
    last_name: str = Field(..., max_length=100)
    hashed_password: str
    role: str = Field("consultor", max_length=50)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime | None = None

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }
