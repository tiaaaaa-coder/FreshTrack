from datetime import date
from pathlib import Path
import os

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field, field_validator
from sqlalchemy import Date, Integer, String, create_engine, select
from sqlalchemy.engine import URL
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

load_dotenv(Path(__file__).with_name(".env"))

database_url = URL.create(
    drivername="postgresql+psycopg",
    username=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    host=os.environ["DB_HOST"],
    port=int(os.environ["DB_PORT"]),
    database=os.environ["DB_NAME"],
)

engine = create_engine(database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class PantryItem(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    expiry_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fresh Track API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PantryItemCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    expiry_date: date

    @field_validator("name")
    @classmethod
    def clean_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Food name cannot be blank.")
        return value


class PantryItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    expiry_date: date


def get_db():
    with SessionLocal() as db:
        yield db


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/items", response_model=list[PantryItemResponse])
def list_items(db: Session = Depends(get_db)):
    statement = select(PantryItem).order_by(PantryItem.expiry_date, PantryItem.id)
    return db.scalars(statement).all()


@app.post("/items", response_model=PantryItemResponse, status_code=201)
def create_item(item_data: PantryItemCreate, db: Session = Depends(get_db)):
    item = PantryItem(
        name=item_data.name,
        expiry_date=item_data.expiry_date,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
    @app.delete("/items/{item_id}")
def remove_item(item_id: int, db: Session = Depends(get_db)):
    item = db.get(PantryItem, item_id)

    if item is None:
        raise HTTPException(status_code=404, detail="Pantry item not found")

    db.delete(item)
    db.commit()
    return {"message": "Pantry item deleted"}
