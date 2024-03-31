import { Component, OnInit } from '@angular/core';
import { UsersDataService } from './services/users-data.service';
import { CacheService } from './services/cache.service';
import { user } from 'src/app/shared/interfaces/user-interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: user[];
  loading: boolean = false;
  constructor(
    private UsersDataService: UsersDataService,
    private CacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.loading = true;
    const cacheKey = 'usersData';
    if (this.CacheService.has(cacheKey)) {
      this.users = this.CacheService.get(cacheKey)['data'];
      this.loading = false;
    } else {
      this.UsersDataService.getUsers().subscribe((data) => {
        this.users = data['data'];
        this.loading = false;
      });
    }
  }
}
