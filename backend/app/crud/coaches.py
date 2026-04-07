from sqlalchemy import func
from sqlalchemy.orm import Session
from app.model.coaches import Coach, CoachSession
from app.schema.coaches import CoachResponse, CoachSessionResponse
from fastapi import HTTPException


def get_coaches(db: Session):
    coaches = db.query(Coach)

    coaches = coaches.all()
    result = []
    for c in coaches:

        result.append(
            CoachResponse(
                id=c.id,
                slug=c.slug,
                name=c.name,
                title=c.title,
                bio=c.bio,
                image=c.image,
            )
        )
    return result


def get_coach(slug: str, db: Session):
    c = db.query(Coach).filter(Coach.slug == slug).first()
    if not c:
        raise HTTPException(status_code=404, detail="Mover not found")

    return CoachResponse(
        id=c.id,
        slug=c.slug,
        name=c.name,
        title=c.title,
        bio=c.bio,
        image=c.image,
    )


def get_sessions(slug: str, db: Session):
    sessions = db.query(CoachSession).join(
        Coach).filter(Coach.slug == slug).all()

    result = []
    for s in sessions:

        result.append(
            CoachSessionResponse(
                id=s.id,
                coachId=s.coach_id,
                start=s.start_date,
                end=s.end_date,
                isBooked=False
            )
        )
    return result
