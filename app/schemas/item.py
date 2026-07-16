from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field, field_validator
from pydantic_settings import ConfigDict


class ItemCreate(BaseModel):
    title: str = Field(..., max_length=200, description="Item title.")
    description: str = Field("", max_length=1000, description="Optional description.")
    completed: bool = Field(False, description="Completion status.")

    model_config = ConfigDict(extra="forbid")


class ItemUpdate(BaseModel):
    title: str | None = Field(None, max_length=200)
    description: str | None = Field(None, max_length=1000)
    completed: bool | None = None

    model_config = ConfigDict(extra="forbid")


class ItemResponse(BaseModel):
    id: str = Field(alias="_id")
    title: str
    description: str
    completed: bool
    created_at: datetime
    updated_at: datetime | None = None

    @field_validator("id", mode="before")
    @classmethod
    def coerce_object_id(cls, v: Any) -> str:
        return str(v)

    model_config = ConfigDict(populate_by_name=True)
