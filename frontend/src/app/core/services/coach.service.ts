import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoachService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Coach[]> {
    return this.http.get<Coach[]>('http://127.0.0.1:8000/coaches/');
  }

  getBySlug(slug: string): Observable<Coach> {
    return this.http.get<Coach>(`http://127.0.0.1:8000/coaches/${slug}`);
  }
}
