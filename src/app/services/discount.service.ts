// discount.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  applyDiscount(count: number, age: number, basePrice: number): number {
    if (age <= 15) {
      return count * basePrice * 0.75; // 25% discount
    }
    return count * basePrice;
  }
}
