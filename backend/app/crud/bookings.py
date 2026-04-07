from sqlalchemy.orm import Session
from app.model.workouts import Workout
from app.model.bookings import Booking
from app.schema.bookings import BookingCreate
from fastapi import HTTPException


def create_booking(booking: BookingCreate, db: Session):
    # Check if class exists
    workout = db.query(Workout).filter(
        Workout.id == booking.workout_id).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")

    # Check if class is full
    if len(workout.bookings) >= workout.capacity:
        raise HTTPException(status_code=400, detail="Workout is fully booked")

    # Check if user already booked
    existing_booking = db.query(Booking).filter(
        Booking.user_id == booking.user_id,
        Booking.class_id == booking.class_id
    ).first()
    if existing_booking:
        raise HTTPException(
            status_code=400, detail="You already booked this workout")

    # Create booking
    db_booking = Booking(user_id=booking.user_id, class_id=booking.class_id)
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


def cancel_booking(booking_id: int, db: Session):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()
    return {"detail": "Booking cancelled"}


def get_user_bookings(user_id: int, db: Session):
    bookings = db.query(Booking).filter(Booking.user_id == user_id).all()
    return bookings
