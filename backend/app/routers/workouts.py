from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schema.workouts import WorkoutResponse
from app.crud import workouts as crud_workouts
from app.database import get_db

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"]
)


# Get all workouts
@router.get("/", response_model=list[WorkoutResponse])
def get_workouts(limit: int = 0, filter: str = None, db: Session = Depends(get_db)):
    return crud_workouts.get_workouts(limit, filter, db)


# Get single workout by slug
@router.get("/{slug}", response_model=WorkoutResponse)
def get_workout(slug: str, db: Session = Depends(get_db)):
    return crud_workouts.get_workout(slug, db)


@router.get("/{slug}/sessions")
def get_workout_sessions(slug: str, db: Session = Depends(get_db)):
    return crud_workouts.get_sessions(slug, db)
