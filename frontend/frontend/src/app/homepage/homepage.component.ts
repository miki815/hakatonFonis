import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    var token = localStorage.getItem("token");
    if (token == "null") {
      this.router.navigate(["login"]);
    }
  }
  game() {
    this.router.navigate(['../game']);
  }
  quiz() {
    this.router.navigate(['../quiz']);
  }

  connect() {
    this.router.navigate(['connestions']);
  }
  logout() {
    localStorage.setItem("token", null);
  }
}
