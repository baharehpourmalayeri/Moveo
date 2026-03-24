import { Routes } from '@angular/router';
import { Home} from './pages/home/home';
import { Booking } from './pages/booking/booking';
import { Points } from './pages/points/points';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'booking', component: Booking },
  { path: 'points', component: Points },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' },
];
