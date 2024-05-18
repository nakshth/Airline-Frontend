// seat-lock.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatLockService {
  private lockedSeats: { [key: string]: NodeJS.Timeout } = {};

  lockSeat(seatId: string): void {
    // Lock the seat for 10 minutes (600,000 milliseconds)
    this.lockedSeats[seatId] = setTimeout(() => {
      this.releaseSeat(seatId);
    }, 600000); // 10 minutes in milliseconds
  }

  releaseSeat(seatId: string): void {
    if (this.lockedSeats[seatId]) {
      clearTimeout(this.lockedSeats[seatId]);
      delete this.lockedSeats[seatId];
      // Make the seat available again
    }
  }

  isSeatLocked(seatId: string): boolean {
    return !!this.lockedSeats[seatId];
  }
}
