import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../../../core/models/workout.model';
import { WorkoutService } from '../../../core/services/workout.service';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';

@Component({
  selector: 'app-user-favorites',
  standalone: true,
  imports: [CommonModule, FavoriteToggle],
  templateUrl: './user-favorites.html',
})
export class UserFavorites implements OnInit {
  workouts: Workout[] = [];
  loading = true;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getFavorites();
    this.loading = false;
  }
}
