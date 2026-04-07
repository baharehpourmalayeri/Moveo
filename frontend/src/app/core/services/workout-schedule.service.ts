import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workout } from '../models/workout.model';
import { WorkoutSession } from '../models/workout.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkoutScheduleService {
  constructor(private http: HttpClient) {}

  private bookedSessions: WorkoutSession[] = [];

  getSchedule(workout: Workout): Observable<WorkoutSession[]> {
    return this.http.get<WorkoutSession[]>(
      `http://127.0.0.1:8000/workouts/${workout.slug}/sessions`,
    );
  }

  isSessionAvailable(sessionId: string): boolean {
    return true;
  }

  bookSession(sessionId: string): boolean {
    return true;
  }

  cancelSession(sessionId: string): boolean {
    return true;
  }

  getSessionById(sessionId: string): WorkoutSession | undefined {
    return undefined;
  }

  getUserBookings(workout?: Workout): WorkoutSession[] {
    if (workout) {
      return this.bookedSessions.filter((s) => s.workoutId === workout.id);
    }
    return this.bookedSessions;
  }
}
