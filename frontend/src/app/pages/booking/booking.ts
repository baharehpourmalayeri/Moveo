import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking {
  classes = [
    { name: 'Yoga', description: 'Relaxing yoga session', capacity: 15 },
    { name: 'HIIT', description: 'High intensity interval training', capacity: 20 },
    { name: 'Pilates', description: 'Core strength and flexibility', capacity: 12 },
  ];
}
