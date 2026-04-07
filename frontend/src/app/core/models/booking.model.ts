
export interface Booking {
  id: number;
  workout: string;
  image?: string;
  start: string;
  end: string;
  status: 'upcoming' | 'canceled';
  coachName?: string;
}
