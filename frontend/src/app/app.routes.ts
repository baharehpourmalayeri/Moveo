import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WorkoutsPage } from './pages/workouts/workouts';
import { Points } from './pages/points/points';
import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { WorkoutDetail } from './pages/workouts/workout-detail/workout-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'workouts', component: WorkoutsPage },
  { path: 'workout/:title', component: WorkoutDetail },
  { path: 'points', component: Points },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '' },
];
