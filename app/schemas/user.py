from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, Field, field_validator
from pydantic_settings import ConfigDict


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    first_name: str = Field(..., max_length=100)
    last_name: str = Field(..., max_length=100)
    role: str | None = Field(None, max_length=50)

    model_config = ConfigDict(extra="forbid")


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., max_length=128)

    model_config = ConfigDict(extra="forbid")


class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    first_name: str
    last_name: str
    role: str
    created_at: datetime

    @field_validator("id", mode="before")
    @classmethod
    def coerce_object_id(cls, v: Any) -> str:
        return str(v)

    model_config = ConfigDict(populate_by_name=True)
