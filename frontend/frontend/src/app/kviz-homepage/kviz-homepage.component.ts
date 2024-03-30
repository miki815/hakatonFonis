import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kviz-homepage',
  templateUrl: './kviz-homepage.component.html',
  styleUrls: ['./kviz-homepage.component.css']
})
export class KvizHomepageComponent {
  constructor(private router: Router) { }
  quiz(type: number){
    if(type === 1){
      sessionStorage.setItem("question_type", "w");
    }
    else if(type === 2){
      sessionStorage.setItem("question_type", "h");
    }
    else if(type === 3){
      sessionStorage.setItem("question_type", "e");
    }
    this.router.navigate(['/quiz/questions']);
  }
}
