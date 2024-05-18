// discount.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  applyDiscount(age: number, basePrice: number): number {
    if (age <= 15) {
      return basePrice * 0.75; // 25% discount
    }
    return basePrice;
  }
}
