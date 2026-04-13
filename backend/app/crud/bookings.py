from sqlalchemy.orm import Session
from app.model.workouts import Workout, WorkoutSession
from app.model.coaches import Coach, CoachSession
from app.schema.coaches import CoachBase
from app.schema.workouts import WorkoutBase
from app.model.bookings import Booking
from app.schema.bookings import WorkoutBookingCreate, CoachBookingCreate, CoachBookingResponse, WorkoutBookingResponse
from fastapi import HTTPException
from sqlalchemy import func


def create_workout_booking(booking: WorkoutBookingCreate, user_id: int, db: Session):
    # Check if class exists
    workout = db.query(Workout).filter(
        Workout.id == booking.workout_id).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")

    workout_session = db.query(WorkoutSession).filter(
        WorkoutSession.id == booking.workout_session_id,
        WorkoutSession.workout_id == booking.workout_id).first()
    if not workout_session:
        raise HTTPException(
            status_code=404, detail="Workout session not found")

    # Check if class is full
    if workout_session.capacity <= workout_session.booked:
        raise HTTPException(
            status_code=400, detail="Workout session is fully booked")

    # Check if user already booked
    existing_booking = db.query(Booking).filter(
        Booking.user_id == user_id,
        Booking.workout_id == booking.workout_id,
        Booking.workout_session_id == booking.workout_session_id
    ).first()
    if existing_booking:
        raise HTTPException(
            status_code=400, detail="You already booked this workout session")

    # Create booking
    db_booking = Booking(user_id=user_id, workout_id=booking.workout_id,
                         workout_session_id=booking.workout_session_id)
    db.add(db_booking)

    workout_session.booked += 1
    db.commit()
    db.refresh(db_booking)

    return WorkoutBookingResponse(
        id=db_booking.id,
        session_id=workout_session.id,
        workout=WorkoutBase(
            id=workout.id,
            slug=workout.slug,
            title=workout.title,
            description=workout.description,
            image=workout.image,
        ),
        start=workout_session.start_date,
        end=workout_session.end_date,
        capacity=workout_session.capacity,
        booked=workout_session.booked
    )


def create_coach_booking(booking: CoachBookingCreate, user_id: int, db: Session):
    # Check if class exists
    coach = db.query(Coach).filter(
        Coach.id == booking.coach_id).first()
    if not coach:
        raise HTTPException(status_code=404, detail="Coach not found")

    coach_session = db.query(CoachSession).filter(
        CoachSession.id == booking.coach_session_id,
        CoachSession.coach_id == booking.coach_id).first()
    if not coach_session:
        raise HTTPException(
            status_code=404, detail="Coach session not found")

    # Check if user already booked
    existing_booking = db.query(Booking).filter(
        Booking.coach_id == booking.coach_id,
        Booking.coach_session_id == booking.coach_session_id
    ).first()
    if existing_booking:
        raise HTTPException(
            status_code=400, detail="Someone already booked this coach session")

    # Create booking
    db_booking = Booking(user_id=user_id, coach_id=booking.coach_id,
                         coach_session_id=booking.coach_session_id)
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)

    return CoachBookingResponse(
        id=db_booking.id,
        session_id=coach_session.id,
        coach=CoachBase(
            id=coach.id,
            slug=coach.slug,
            title=coach.title,
            name=coach.name,
            image=coach.image,
        ),
        start=coach_session.start_date,
        end=coach_session.end_date,
    )


def cancel_workout_booking(booking_id: int, user_id: int, db: Session):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == user_id,
        Booking.workout_session_id != None).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.workout_session.booked -= 1
    db.delete(booking)
    db.commit()
    return {"detail": "Booking cancelled"}


def cancel_coach_booking(booking_id: int, user_id: int, db: Session):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == user_id,
        Booking.coach_session_id != None).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()
    return {"detail": "Booking cancelled"}


def get_user_workout_bookings(user_id: int, db: Session, workout_slug: str | None = None):
    bookings = db.query(Booking).filter(
        Booking.user_id == user_id,
        Booking.workout_session_id != None).join(WorkoutSession).filter(
        WorkoutSession.start_date >= func.now()
    )

    if workout_slug:
        bookings = bookings.join(
            Workout).filter(Workout.slug == workout_slug)

    bookings = bookings.all()
    result = []
    for b in bookings:
        result.append(
            WorkoutBookingResponse(
                id=b.id,
                session_id=b.workout_session.id,
                workout=WorkoutBase(
                    id=b.workout.id,
                    slug=b.workout.slug,
                    title=b.workout.title,
                    description=b.workout.description,
                    image=b.workout.image,
                ),
                start=b.workout_session.start_date,
                end=b.workout_session.end_date,
                capacity=b.workout_session.capacity,
                booked=b.workout_session.booked
            )
        )
    return result


def get_user_coach_bookings(user_id: int, db: Session, coach_slug: str | None = None):
    bookings = db.query(Booking).filter(
        Booking.user_id == user_id,
        Booking.coach_session_id != None).join(CoachSession).filter(
        CoachSession.start_date >= func.now()
    )

    if coach_slug:
        bookings = bookings.join(
            Coach).filter(Coach.slug == coach_slug)

    bookings = bookings.all()

    result = []
    for b in bookings:
        result.append(
            CoachBookingResponse(
                id=b.id,
                session_id=b.coach_session.id,
                coach=CoachBase(
                    id=b.coach.id,
                    slug=b.coach.slug,
                    title=b.coach.title,
                    name=b.coach.name,
                    image=b.coach.image,
                ),
                start=b.coach_session.start_date,
                end=b.coach_session.end_date,
            )
        )
    return result
