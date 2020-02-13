import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartItemStorageService {

constructor() { }

  /**
   * @description - Method to set data in storage.
   * @param - key
   * @param - data
  */
  set(key: string, data: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to sessionStorage', e);
    }
  }

  /**
   * @description - Method to get data in storage.
   * @param - key
  */
  get(key: string) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from sessionStorage', e);
      return null;
    }
  }

}
