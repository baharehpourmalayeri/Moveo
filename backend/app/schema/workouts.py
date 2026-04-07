from pydantic import BaseModel
from datetime import datetime


class WorkoutResponse(BaseModel):
    id: int
    slug: str
    title: str
    description: str
    longDescription: str
    image: str | None = None
    isFavorite: bool = False

    class Config:
        orm_mode = True


class WorkoutSessionResponse(BaseModel):
    id: int
    workoutId: int
    start: datetime
    end: datetime
    capacity: int
    booked: int
    isBooked: bool

    class Config:
        orm_mode = True
