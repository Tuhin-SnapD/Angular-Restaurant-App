import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationAvailability, ReservationResponse, ReservationSlot } from '../shared/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html'
})
export class ReservationsComponent implements OnInit {
  reservationForm: FormGroup;
  availability: ReservationAvailability;
  loadingAvailability = true;
  submitting = false;
  availabilityError = '';
  submitError = '';
  confirmation: ReservationResponse;
  minDate = '';

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService) {
    this.minDate = this.localDate();
    this.reservationForm = this.formBuilder.group({
      guestName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(24)]],
      date: [this.minDate, Validators.required],
      time: ['', Validators.required],
      partySize: [2, [Validators.required, Validators.min(1), Validators.max(12)]],
      occasion: ['dinner', Validators.required],
      note: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.loadAvailability();
    this.reservationForm.get('date').valueChanges.subscribe(() => this.loadAvailability());
    this.reservationForm.get('partySize').valueChanges.subscribe(() => this.loadAvailability());
  }

  private localDate(): string {
    const date = new Date();
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  loadAvailability(): void {
    const date = this.reservationForm.get('date').value;
    const partySize = Number(this.reservationForm.get('partySize').value);
    if (!date || !partySize) { return; }
    this.loadingAvailability = true;
    this.availabilityError = '';
    this.reservationService.getAvailability(date, partySize).subscribe(
      (availability) => {
        this.availability = availability;
        const currentTime = this.reservationForm.get('time').value;
        const currentSlot = availability.slots.filter((slot: ReservationSlot) => slot.time === currentTime && slot.available)[0];
        const nextSlot = currentSlot || availability.slots.filter((slot: ReservationSlot) => slot.available)[0];
        this.reservationForm.get('time').setValue(nextSlot ? nextSlot.time : '', { emitEvent: false });
        this.loadingAvailability = false;
      },
      (error) => {
        this.availability = null;
        this.availabilityError = error || 'Could not load seating availability.';
        this.loadingAvailability = false;
      }
    );
  }

  selectTime(time: string): void {
    this.reservationForm.get('time').setValue(time);
    this.submitError = '';
    this.confirmation = null;
  }

  noAvailableTimes(): boolean {
    return !!this.availability && !this.availability.slots.some((slot: ReservationSlot) => slot.available);
  }

  onSubmit(): void {
    if (this.reservationForm.invalid || this.submitting) {
      Object.keys(this.reservationForm.controls).forEach((key) => this.reservationForm.get(key).markAsTouched());
      return;
    }
    this.submitting = true;
    this.submitError = '';
    this.confirmation = null;
    const payload = Object.assign({}, this.reservationForm.value, { partySize: Number(this.reservationForm.value.partySize) });
    this.reservationService.createReservation(payload).subscribe(
      (result) => {
        this.confirmation = result;
        this.submitting = false;
        this.loadAvailability();
      },
      (error) => {
        this.submitError = error || 'We could not send your request. Please try again.';
        this.submitting = false;
        this.loadAvailability();
      }
    );
  }
}
