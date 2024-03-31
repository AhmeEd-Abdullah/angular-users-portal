import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private cacheKey = 'usersData';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getUsers(): Observable<any[]> {
    if (this.cacheService.has(this.cacheKey)) {
      return this.cacheService.get(this.cacheKey);
    } else {
      const users$ = this.http.get<any[]>(
        'https://reqres.in/api/users?page={page}'
      );
      users$.subscribe((data) => {
        this.cacheService.set(this.cacheKey, data);
      });
      return users$;
    }
  }
}
