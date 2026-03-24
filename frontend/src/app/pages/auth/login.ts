import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // add FormsModule if using ngModel
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';

  // temporary feedback for login
  login() {
    console.log('Logging in with', this.email, this.password);
    alert(`Logged in with: ${this.email}`);
    // later: call AuthService.login(...)
  }
}
