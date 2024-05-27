import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SeatingPlanService {
    public seatingPlan: any[][]; // 2D array to represent seat availability
    public lockedSeats: Set<string>; // Set to store locked seats as "row-seat" strings
    public bookedSeats: Set<string>; // Set to store booked seats as "row-seat" strings
    public MAX_BOOKING_LIMIT: number = 6; // Maximum number of seats that can be booked at once

    NUM_ROWS: number = 10;
    NUM_SEATS_PER_ROW: number = 5;
    private BASE_PRICE: number = 100; // Base price for a seat
    private CHILD_DISCOUNT: number = 0.25; // Discount percentage for children
    private FIRE_EXIT_ROWS: number[] = [9]; // Rows with fire exit seats


    adults: number = 0;
    childs: number = 0;
    constructor() {
        this.initializeSeatingPlan();
        this.lockedSeats = new Set<string>();
        this.bookedSeats = new Set<string>();
    }

    private initializeSeatingPlan(): void {
        // Initialize seating plan with all seats as available
        let sessionseatingPlan = sessionStorage['seatingPlan']
        if (sessionseatingPlan) {
            this.seatingPlan = JSON.parse(sessionseatingPlan);
        } else {
            this.seatingPlan = [
                [{ sort: 0, type: 'first', seatID: '1 A', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 0, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 0, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 0, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 1, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 1, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 1, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 1, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 2, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 2, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 2, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 2, type: 'first', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 3, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 3, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 3, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 3, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 3, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 3, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 4, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 4, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 4, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 4, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 4, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 4, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 5, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 5, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 5, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 5, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 5, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 5, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 6, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 6, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 6, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 6, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 6, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 6, type: 'business', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 7, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 7, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 7, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 7, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 7, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 7, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 8, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 8, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 8, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 8, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 8, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 8, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 9, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 9, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 9, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 9, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 9, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 9, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 11, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 11, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 11, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 11, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 11, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 11, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 12, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 12, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 12, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 12, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 12, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 12, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 13, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 13, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 13, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 13, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 13, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 13, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 14, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 14, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 14, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 14, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 14, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 14, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 15, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 15, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 15, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 15, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 15, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 15, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 16, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 16, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 16, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 16, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 16, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 16, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 17, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 17, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 17, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 17, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 17, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 17, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 18, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 18, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 18, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 18, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 18, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 18, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{ sort: 19, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 19, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 19, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 19, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 19, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 19, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }],
                [{}, { sort: 20, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 20, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 20, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, { sort: 20, type: 'economy', isLocked: false, isBooked: false, user: { id: '', bookedBy: '' } }, {}],
            ];

        }

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
        debugger
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
        debugger
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

    public isSeatLocked(row: number, seat: number): boolean {
        const seatKey = this.getSeatKey(row, seat);
        return this.lockedSeats.has(seatKey);
    }
    checkSeatingRow(index: number) {
        return String.fromCharCode(65 + index)
    }

    addBookingData(rowIndex, seatIndex, selected) {
        this.seatingPlan[rowIndex][seatIndex]['isSelected'] = selected;
        this.seatingPlan[rowIndex][seatIndex]['seatNumber'] = `${rowIndex + 1} ${this.checkSeatingRow(seatIndex)}`;
        const seatKey = this.getSeatKey(rowIndex, seatIndex);
        if (selected) {
            this.bookedSeats.add(seatKey);
            return true;
        }
    }

    public bookSeat(seat: any, row: any, rowIndex, seatIndex, selected: boolean): boolean {
debugger
        // this.seatingPlan[rowIndex][seatIndex]['isSelected'] = selected;
        this.seatingPlan[rowIndex][seatIndex]['seatNumber'] = `${rowIndex + 1} ${this.checkSeatingRow(seatIndex)}`;
        const seatKey = this.getSeatKey(rowIndex, seatIndex);
        if (selected) {
            this.bookedSeats.add(seatKey);
            return true;
        } else {
            this.bookedSeats.delete(seatKey);
            return false;
        } // Booking successful
        if (this.bookedSeats.size < this.MAX_BOOKING_LIMIT) {

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
    public isNearFireExit(row: number, seat: number): boolean {
        return this.FIRE_EXIT_ROWS.includes(row) && [0, 5].includes(seat);
    }

    public areAdjacentSeatsAvailable(row: number, seat: number): boolean {
        // Check if the adjacent seats (left and right) are available
        const leftSeatAvailable = seat > 0 ? !this.seatingPlan[row][seat - 1].isBooked : false;
        const rightSeatAvailable = seat < this.seatingPlan[row].length - 1 ? !this.seatingPlan[row][seat + 1].isBooked : false;
        const topSeatAvailable = row > 1 && row < 20  ? !this.seatingPlan[row - 1][seat - 1].isBooked : true;
        const bottomSeatAvailable = row > 2 && row < 20 ? !this.seatingPlan[row][seat + 1].isBooked : true;
        return leftSeatAvailable && rightSeatAvailable && topSeatAvailable && bottomSeatAvailable
    }

}

