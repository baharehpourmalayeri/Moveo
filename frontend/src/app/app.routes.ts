import { Routes } from '@angular/router';
import { Home} from './pages/home/home';
import { Booking } from './pages/booking/booking';
import { Points } from './pages/points/points';
import { Auth } from './pages/auth/auth';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'booking', component: Booking },
  { path: 'points', component: Points },
  { path: 'login', component: Auth },
  { path: '**', redirectTo: '' },
];
