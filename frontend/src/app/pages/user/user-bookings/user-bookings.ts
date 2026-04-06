import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user-bookings.html',
})
export class UserBookings implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getUserBookings().subscribe((data) => {
      this.bookings = data;
      this.loading = false;
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
