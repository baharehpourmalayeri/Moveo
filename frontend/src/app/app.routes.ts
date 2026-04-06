import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WorkoutsPage } from './pages/workouts/workouts';
import { WorkoutDetail } from './pages/workouts/workout-detail/workout-detail';
import { Coaches } from './pages/coaches/coaches';
import { CoachDetail } from './pages/coaches/coach-details/coach-details';
import { UserAccount } from './pages/user/user-account/user-account';
import { UserBookings } from './pages/user/user-bookings/user-bookings';
import { UserFavorites } from './pages/user/user-favorites/user-favorites';
import { Logout } from './pages/auth/logout';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'user/account', component: UserAccount },
  { path: 'user/bookings', component: UserBookings },
  { path: 'user/favorites', component: UserFavorites },
  { path: 'workouts', component: WorkoutsPage },
  { path: 'workout/:slug', component: WorkoutDetail },
  { path: 'coaches', component: Coaches },
  { path: 'coach/:slug', component: CoachDetail },
  { path: 'logout', component: Logout },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' },
];
