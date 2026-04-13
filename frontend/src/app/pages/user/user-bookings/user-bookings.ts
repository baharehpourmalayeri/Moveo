import { Component, OnInit } from '@angular/core';
import { CoachScheduleService } from '../../../core/services/coach-schedule.service';
import { BookedCoachSession } from '../../../core/models/coach.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { BookedWorkoutSession } from '../../../core/models/workout.model';
import { WorkoutScheduleService } from '../../../core/services/workout-schedule.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user-bookings.html',
})
export class UserBookings implements OnInit {
  coachBookings: BookedCoachSession[] = [];
  workoutBookings: BookedWorkoutSession[] = [];
  loading = true;

  constructor(
    private coachScheduleService: CoachScheduleService,
    private workoutScheduleService: WorkoutScheduleService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.coachScheduleService.getUserBookings().subscribe((data) => {
      this.coachBookings = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
    this.workoutScheduleService.getUserBookings().subscribe((data) => {
      this.workoutBookings = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'upcoming':
        return 'text-green-800';
      case 'canceled':
        return 'text-red-800';
      default:
        return '';
    }
  }
}
