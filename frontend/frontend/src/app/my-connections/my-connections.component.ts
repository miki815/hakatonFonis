import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/users';
import { Connection } from '../models/Connection';

@Component({
  selector: 'app-my-connections',
  templateUrl: './my-connections.component.html',
  styleUrls: ['./my-connections.component.css']
})
export class MyConnectionsComponent {
  users: Connection[] = [];



  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('token') || '{}');
    this.userService.allMyConnections(user.username).subscribe((users: Connection[]) => {
      this.users = users;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].users[0] == user.username) {
          this.users[i].button = 0;
        } else {
          this.users[i].button = 1;
        }
        this.users[i].users = this.users[i].users.filter((user1: string) => user1 != user.username);
      }
    });


  }

  connect(username: string) {
    var user = JSON.parse(localStorage.getItem('token') || '{}');
    this.userService.connect(user.username, username).subscribe((res) => {

    });
  }

}
