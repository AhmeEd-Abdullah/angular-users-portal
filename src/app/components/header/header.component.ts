import { Component, Input } from '@angular/core';
import { user } from 'src/app/shared/interfaces/user-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() usersData: user[];
  userIds: any[];
  userSearchResult: user[];
  userExist: boolean;
  userNotExist: boolean;

  constructor() {}

  usersSearch(userId: string) {
    this.setUsersId(this.usersData);
    if (userId == '') {
      this.userExist = false;
      this.userNotExist = false;
    } else if (this.userIds.indexOf(+userId) != -1) {
      this.userSearchResult = this.usersData.filter(
        (user) => +user.id === +userId
      );
      this.userExist = true;
      this.userNotExist = false;
    } else {
      this.userNotExist = true;
      this.userExist = false;
    }
  }

  setUsersId(users: user[]) {
    this.userIds = users.map((user) => user.id);
  }
}
