// seating-algorithm.ts

interface Seat {
    row: number;
    seat: number;
    booked: boolean;
}

export class SeatingAlgorithm {
    constructor(private seatingPlan: Seat[][]) { }

    public assignSeats(): void {
        for (let row = 0; row < this.seatingPlan.length; row++) {
            for (let seat = 0; seat < this.seatingPlan[row].length; seat++) {
                if (!this.seatingPlan[row][seat].booked) {
                    // Check if adjacent seats are available
                    const adjacentSeatsAvailable = this.areAdjacentSeatsAvailable(row, seat);

                    if (adjacentSeatsAvailable) {
                        // If adjacent seats are available, book the current seat and adjacent seats
                        this.seatingPlan[row][seat].booked = true;
                        this.bookAdjacentSeats(row, seat);
                    } else {
                        // If adjacent seats are not available, continue to the next seat
                        continue;
                    }
                }
            }
        }
    }

    private areAdjacentSeatsAvailable(row: number, seat: number): boolean {
        // Check if the adjacent seats (left and right) are available
        const leftSeatAvailable = seat > 0 ? !this.seatingPlan[row][seat - 1].booked : false;
        const rightSeatAvailable = seat < this.seatingPlan[row].length - 1 ? !this.seatingPlan[row][seat + 1].booked : false;

        return leftSeatAvailable && rightSeatAvailable;
    }

    private bookAdjacentSeats(row: number, seat: number): void {
        // Book the adjacent seats (left and right) of the current seat
        if (seat > 0) {
            this.seatingPlan[row][seat - 1].booked = true;
        }
        if (seat < this.seatingPlan[row].length - 1) {
            this.seatingPlan[row][seat + 1].booked = true;
        }
    }
}
