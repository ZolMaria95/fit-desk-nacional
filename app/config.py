from pathlib import Path
from typing import List

from dotenv import load_dotenv
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv(dotenv_path=Path(".env"))


class Settings(BaseSettings):
    mongodb_uri: str = Field(..., env="MONGODB_URI")
    database_name: str = Field(..., env="DATABASE_NAME")
    environment: str = Field("development", env="ENVIRONMENT")
    allowed_origins: List[str] = Field(..., env="ALLOWED_ORIGINS")
    jwt_secret: str = Field(..., env="JWT_SECRET")
    jwt_algorithm: str = Field("HS256", env="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(60, env="ACCESS_TOKEN_EXPIRE_MINUTES")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="forbid",
    )

    @field_validator("environment")
    @classmethod
    def validate_environment(cls, value: str) -> str:
        normalized = value.strip().lower()
        if normalized not in {"development", "production"}:
            raise ValueError("ENVIRONMENT must be either 'development' or 'production'.")
        return normalized

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, value):
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value


settings = Settings()
