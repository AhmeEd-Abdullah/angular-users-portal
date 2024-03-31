import { CacheUserService } from './services/cache-user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailsService } from './services/user-details.service';
import { user } from 'src/app/shared/interfaces/user-interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userDetails: user;
  userId: string = this.activatedRoute.snapshot.paramMap.get('id');
  loading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private CacheUserService: CacheUserService,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    this.loading = true;
    const cacheKey = 'userDetailsData';
    if (this.CacheUserService.has(cacheKey + this.userId)) {
      this.userDetails = this.CacheUserService.get(cacheKey + this.userId)[
        'data'
      ];
      this.loading = false;
    } else {
      this.userDetailsService.getUserDetails(this.userId).subscribe((data) => {
        this.userDetails = data['data'];
        this.loading = false;
      });
    }
  }
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
