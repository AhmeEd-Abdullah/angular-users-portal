import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheUserService } from './cache-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private cacheKey = 'userDetailsData';

  constructor(
    private http: HttpClient,
    private CacheUserService: CacheUserService
  ) {}

  getUserDetails(userId: string) {
    if (this.CacheUserService.has(this.cacheKey + userId)) {
      return this.CacheUserService.get(this.cacheKey + userId);
    } else {
      const userDetails$ = this.http.get<any>(
        'https://reqres.in/api/users/' + userId
      );
      userDetails$.subscribe((data) => {
        this.CacheUserService.set(this.cacheKey + userId, data);
      });
      return userDetails$;
    }
  }
}
