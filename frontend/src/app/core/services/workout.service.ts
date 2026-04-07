import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>('http://127.0.0.1:8000/workouts/');
  }

  getBySlug(slug: string): Observable<Workout> {
    return this.http.get<Workout>(`http://127.0.0.1:8000/workouts/${slug}`);
  }

  getTop(n: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`http://127.0.0.1:8000/workouts/?limit=${n}`);
  }

  getFilteredWorkouts(filter: string): Observable<Workout[]> {
    return this.http.get<Workout[]>(`http://127.0.0.1:8000/workouts/?filter=${filter}`);
  }

  getFavorites(): Workout[] {
    return [];
  }

  toggleFavorite(workout: Workout) {
    workout.isFavorite = !workout.isFavorite;
  }
}
