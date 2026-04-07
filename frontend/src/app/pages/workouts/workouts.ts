import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutList } from './workout-list/workout-list';
import { WorkoutService } from '../../core/services/workout.service';
import { MatIconModule } from '@angular/material/icon';
import { Workout } from '../../core/models/workout.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-workouts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, WorkoutList, MatIconModule],
  templateUrl: './workouts.html',
})
export class WorkoutsPage {
  _searchTerm = '';
  workouts: Workout[] = [];

  constructor(
    private workoutService: WorkoutService,
    private cdr: ChangeDetectorRef,
  ) {}

  get searchTerm() {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.onSearchTermChange(value);
  }

  onSearchTermChange(value: string) {
    console.log('Search term changed:', value);
    this.workoutService.getFilteredWorkouts(value).subscribe((workouts) => {
      this.workouts = workouts;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.workoutService.getAll().subscribe((workouts) => {
      this.workouts = workouts;
      this.cdr.detectChanges();
    });
  }
}
