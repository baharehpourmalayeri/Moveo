from sqlalchemy import func
from sqlalchemy.orm import Session
from app.model.workouts import Workout, WorkoutSession
from app.schema.workouts import WorkoutResponse, WorkoutSessionResponse
from fastapi import HTTPException


def get_workouts(limit: int, filter: str, db: Session):
    workouts = db.query(Workout)
    if limit > 0:
        workouts = workouts.limit(limit)
    if filter:
        workouts = workouts.filter(func.lower(
            Workout.title).contains(func.lower(filter)))
    workouts = workouts.all()
    result = []
    for w in workouts:

        result.append(
            WorkoutResponse(
                id=w.id,
                slug=w.slug,
                title=w.title,
                description=w.description,
                longDescription=w.long_description,
                image=w.image,
                isFavorite=False

            )
        )
    return result


def get_workout(slug: str, db: Session):
    w = db.query(Workout).filter(Workout.slug == slug).first()
    if not w:
        raise HTTPException(status_code=404, detail="Workout not found")

    return WorkoutResponse(
        id=w.id,
        slug=w.slug,
        title=w.title,
        description=w.description,
        longDescription=w.long_description,
        image=w.image,
        isFavorite=False
    )


def get_sessions(slug: str, db: Session):
    sessions = db.query(WorkoutSession).join(
        Workout).filter(Workout.slug == slug).all()

    result = []
    for s in sessions:

        result.append(
            WorkoutSessionResponse(
                id=s.id,
                workoutId=s.workout_id,
                start=s.start_date,
                end=s.end_date,
                capacity=s.capacity,
                booked=s.booked,
                isBooked=False
            )
        )
    return result
