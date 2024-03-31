import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheUserService {
  private cacheUser: { [key: string]: any } = {};

  constructor() {}

  has(key: string): boolean {
    return this.cacheUser.hasOwnProperty(key);
  }

  get(key: string): any {
    return this.cacheUser[key];
  }

  set(key: string, value: any): void {
    this.cacheUser[key] = value;
  }
}
