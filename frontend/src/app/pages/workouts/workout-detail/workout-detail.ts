import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { Workout } from '../workout-list/workout-list';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, FavoriteToggle],
  templateUrl: './workout-detail.html',
})
export class WorkoutDetail {
  workout: Workout | undefined;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
  ) {}
  ngOnInit() {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.workout = this.workoutService.getByTitle(title);
    }
  }

  onFavoriteChange(isFav: boolean) {
    if (this.workout) {
      this.workout.isFavorite = isFav;
    }
  }
}
