export interface ReservationSlot {
  time: string;
  reservedGuests: number;
  remainingGuests: number;
  available: boolean;
  past: boolean;
}

export interface ReservationAvailability {
  date: string;
  partySize: number;
  seatCapacity: number;
  timeZone: string;
  slots: ReservationSlot[];
}

export interface ReservationRecord {
  _id: string;
  confirmationCode: string;
  status: string;
  date: string;
  time: string;
  partySize: number;
}

export interface ReservationResponse {
  reservation: ReservationRecord;
  message: string;
}
