import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SeatingPlanService {
    private seatingPlan: any[][]; // 2D array to represent seat availability
    private lockedSeats: Set<string>; // Set to store locked seats as "row-seat" strings
    private bookedSeats: Set<string>; // Set to store booked seats as "row-seat" strings
    private MAX_BOOKING_LIMIT: number = 6; // Maximum number of seats that can be booked at once

    NUM_ROWS: number = 10;
    NUM_SEATS_PER_ROW: number = 5;
    private BASE_PRICE: number = 100; // Base price for a seat
    private CHILD_DISCOUNT: number = 0.25; // Discount percentage for children
    private FIRE_EXIT_ROWS: number[] = [10, 16]; // Rows with fire exit seats


    constructor() {
        this.initializeSeatingPlan();
        this.lockedSeats = new Set<string>();
        this.bookedSeats = new Set<string>();
    }

    private initializeSeatingPlan(): void {
        // Initialize seating plan with all seats as available
        this.seatingPlan = [
            [{ type: 'first', seatId: '1A', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{ type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
            [{}, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, {}],
        ]
        // this.seatingPlan = [];
        // for (let row = 0; row < this.NUM_ROWS; row++) {
        //     this.seatingPlan[row] = [];
        //     for (let seat = 0; seat < this.NUM_SEATS_PER_ROW; seat++) {
        //         this.seatingPlan[row][seat] = true; // Seat is available
        //     }
        // }
    }

    public getSeatingPlan(): boolean[][] {
        return this.seatingPlan;
    }

    public isSeatAvailable(row: number, seat: number): boolean {
        debugger
        return this.seatingPlan[row][seat] && !this.isSeatBooked(row, seat) //&& !this.isNearFireExit(row, seat);
    }

    // Method to prioritize group booking seats
    public prioritizeGroupBookingSeats(): void {
        // Example: prioritize rows 1 to 5 for group bookings
        for (let row = 0; row < 5; row++) {
            this.moveRowToTop(row);
        }
    }

    private moveRowToTop(row: number): void {
        const rowToMove = this.seatingPlan.splice(row, 1)[0];
        this.seatingPlan.unshift(rowToMove);
    }

    // Method to allocate seats based on the algorithm
    public allocateSeats(): void {
        // Example: allocate seats based on predefined criteria
        for (let row = 0; row < this.seatingPlan.length; row++) {
            for (let seat = 0; seat < this.seatingPlan[row].length; seat++) {
                if (this.seatingPlan[row][seat]) {
                    // Check if seat fits predefined criteria (e.g., window seat)
                    // Implement your seat allocation logic here
                    // For simplicity, just occupy the first available seat
                    this.seatingPlan[row][seat] = false; // Mark seat as occupied
                    return; // Allocate only one seat for demonstration
                }
            }
        }
    }


    public lockSeat(row: number, seat: number): void {
        const seatKey = this.getSeatKey(row, seat);
        this.lockedSeats.add(seatKey);
        setTimeout(() => {
            this.unlockSeat(row, seat); // Automatically unlock seat after a timeout
        }, 600000); // Lock duration: 10 minutes (600,000 milliseconds)
    }

    public unlockSeat(row: number, seat: number): void {
        const seatKey = this.getSeatKey(row, seat);
        this.lockedSeats.delete(seatKey);
    }

    private isSeatLocked(row: number, seat: number): boolean {
        const seatKey = this.getSeatKey(row, seat);
        return this.lockedSeats.has(seatKey);
    }

    public bookSeat(row: number, seat: number, selected: boolean): boolean {
        if (this.bookedSeats.size < this.MAX_BOOKING_LIMIT) {
            const seatKey = this.getSeatKey(row, seat);
            if (selected) {
                this.bookedSeats.add(seatKey);
                return true;
            } else {
                this.bookedSeats.add(seatKey);
                return false;
            } // Booking successful
        } else {
            return false; // Booking failed (reached booking limit)
        }
    }

    public cancelBooking(row: number, seat: number): void {
        const seatKey = this.getSeatKey(row, seat);
        this.bookedSeats.delete(seatKey);
    }

    public isSeatBooked(row: number, seat: number): boolean {
        const seatKey = this.getSeatKey(row, seat);
        return this.bookedSeats.has(seatKey);
    }

    public calculatePrice(isChild: boolean): number {
        if (isChild) {
            return this.BASE_PRICE * (1 - this.CHILD_DISCOUNT);
        } else {
            return this.BASE_PRICE;
        }
    }

    private getSeatKey(row: number, seat: number): string {
        return `${row}-${seat}`;
    }

    // Method to check if a seat is near a fire exit
    private isNearFireExit(row: number, seat: number): boolean {
        return this.FIRE_EXIT_ROWS.includes(row) && seat >= 9 && seat <= 15;
    }

}

