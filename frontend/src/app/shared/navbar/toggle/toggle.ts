import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-dark-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.html',
})
export class ToggleDarkMode {
  @Input() darkMode = false;
  @Output() darkModeChange = new EventEmitter<boolean>();

  toggle() {
    this.darkModeChange.emit(!this.darkMode);
  }
}
