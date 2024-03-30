import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/users';
//const crypto = require('crypto');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  password: string | undefined;
  password1: string | undefined;
  email: string | undefined;
  telephone: string | undefined;
  age: number | undefined;

  country: string | undefined;
  city: string | undefined;
  type: string | undefined; 
  languages = [] 
  message: string | undefined;  
  
  constructor(private servis: UserService, private router: Router){}

  ngOnInit(): void {
    this.age = -1
  }

  hashPassword(password: any) {
    //const hash = crypto.createHash('sha256');
    //hash.update(password);
    //return hash.digest('hex');
    return password;
  }

  register(){
   

    if (
      this.username &&
      this.password &&
      this.password.length >= 8 &&
      this.password === this.password1 &&
      this.name &&
      this.surname &&
      this.country &&
      this.city &&
      this.telephone &&
      this.email &&
      this.email.includes('@') &&
      this.languages.length
    ) {
      const hashedPassword = this.hashPassword(this.password);
      this.servis.register(
        this.username, 
        hashedPassword, 
        this.name, 
        this.surname, 
        this.country, 
        this.city, 
        this.telephone,
        this.email,
        this.languages
        ).subscribe((message: any )=>{
        
      
     })
    } else {
      this.message = "The data is not correct.\n The password should contain at least 8 characters. \n You must be of legal age."
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

}
