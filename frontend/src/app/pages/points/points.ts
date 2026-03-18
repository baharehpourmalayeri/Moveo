import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points.html',
  styleUrls: ['./points.css']
})
export class Points {
  points = 120; // example user points
}
