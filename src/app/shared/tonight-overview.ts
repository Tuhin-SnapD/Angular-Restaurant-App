export interface OpenSeating {
  time: string;
  remainingGuests: number;
}

export interface TonightOverview {
  date: string;
  localTime: string;
  timeZone: string;
  serviceStatus: 'upcoming' | 'open' | 'closed';
  seatCapacityPerSeating: number;
  openSeatings: number;
  remainingSeatCapacity: number;
  nextAvailableTime: string;
  nextAvailableTimes: OpenSeating[];
}
