import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor() {}

  getUserBookings(): Observable<Booking[]> {
    const mockBookings: Booking[] = [
      {
        id: 1,
        workout: 'Crossfit & Strength Coach',
        image: '/assets/coach/1.jpg',
        start: '2026-04-10T10:00:00',
        end: '2026-04-10T11:00:00',
        status: 'upcoming',
        coachName: 'Oscar Lund',
      },
      {
        id: 2,
        workout: 'Pilates',
        image: '/assets/coach/2.jpg',
        start: '2026-03-28T14:00:00',
        end: '2026-03-28T15:00:00',
        status: 'upcoming',
        coachName: 'Alice Johansson',
      },
      {
        id: 3,
        workout: 'Boxing',
        image: '/assets/coach/3.png',
        start: '2026-04-05T09:00:00',
        end: '2026-04-05T10:00:00',
        status: 'canceled',
        coachName: 'Linnea Sjöberg',
      },
    ];
    return of(mockBookings);
  }
}
