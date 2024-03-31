import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router) { }
  user: User;


  ngOnInit(){
    var token = localStorage.getItem("token");
    if(token == "null"){
      this.router.navigate(["login"]);   
    } else {
      this.user = JSON.parse(token);
    }
  }


  logout(){
    localStorage.setItem("token", null);
  }
}
