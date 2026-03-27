import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../workouts/workout-list/workout-list';
import { WorkoutService } from '../../core/services/workout.service';
import { PopularWorkouts } from './popular-workouts-section/popular-workouts';
import { Rewards } from './rewards-section/rewards';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PopularWorkouts, Rewards],
  templateUrl: './home.html',
})
export class Home {
  topWorkouts: Workout[] = [];

  rewardCards = [
    { title: 'Easy Booking', description: 'Reserve your spot in just a few clicks.' },
    { title: 'Popular Sessions', description: 'Join Yoga, HIIT, Pilates and more.' },
    { title: 'Earn Points', description: 'Stay active and get rewarded.' },
  ];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.topWorkouts = this.workoutService.getTop(3);
  }
}
