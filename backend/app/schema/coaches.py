from pydantic import BaseModel
from datetime import datetime


class CoachResponse(BaseModel):
    id: int
    slug: str
    name: str
    title: str
    bio: str
    image: str | None = None

    class Config:
        orm_mode = True


class CoachSessionResponse(BaseModel):
    id: int
    coachId: int
    start: datetime
    end: datetime
    isBooked: bool

    class Config:
        orm_mode = True
