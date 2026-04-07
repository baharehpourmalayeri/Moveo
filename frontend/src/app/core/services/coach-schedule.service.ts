import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coach, CoachSession } from '../models/coach.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoachScheduleService {
  constructor(private http: HttpClient) {}

  private bookedSessions: CoachSession[] = [];

  userId = 'user123';

  getSchedule(coach: Coach): Observable<CoachSession[]> {
    return this.http.get<CoachSession[]>(`http://127.0.0.1:8000/coaches/${coach.slug}/sessions`);
  }

  bookSession(sessionId: string): boolean {
    return true;
  }

  cancelSession(sessionId: string): boolean {
    return true;
  }

  getSessionById(sessionId: string): CoachSession | undefined {
    return undefined;
  }

  getUserBookings(coach?: Coach): CoachSession[] {
    if (coach) {
      return this.bookedSessions.filter((s) => s.coachId === coach.id);
    }
    return this.bookedSessions;
  }
}
