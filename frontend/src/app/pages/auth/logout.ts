import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.html',
})
export class Logout implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
