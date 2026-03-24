import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GymClass } from '../../core/models/booking.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking {
  classes: GymClass[] = [
  { name: 'Yoga', description: 'Relaxing yoga session', capacity: 15 },
  { name: 'HIIT', description: 'High intensity interval training', capacity: 20 },
  { name: 'Pilates', description: 'Core strength and flexibility', capacity: 12 },
];

 bookClass(cls: GymClass) {
    cls['booked'] = true;
    console.log('Booking:', cls.name);
    alert(`You booked: ${cls.name}`);
  }
}
