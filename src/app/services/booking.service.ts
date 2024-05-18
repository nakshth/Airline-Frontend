// booking.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  cancelBooking(bookingId: string, departureTime: Date): boolean {
    const currentTime = new Date();
    const timeDifference = departureTime.getTime() - currentTime.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference <= 72) {
      // Cannot cancel booking within 72 hours of departure
      return false;
    }

    // Proceed with cancellation
    return true;
  }
}
