export interface GymClass {
  name: string;
  description: string;
  capacity: number;
  booked?: boolean;
}

export interface Booking {
  id: number;
  workout: string;
  image?: string;
  start: string;
  end: string;
  status: 'upcoming' | 'canceled';
  coachName?: string;
}
