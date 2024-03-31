import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  uri = 'http://127.0.0.1:4000'


  login(username: any, password: any) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(username: string, password: string, name: string, surname: string, country: string, city: string, telephone: string, email: string, languages: string[], age: number
    , language: string) {
    const data = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      country: country,
      city: city,
      telephone: telephone,
      email: email,
      languages: languages,
      age: age,
      language: language,
      points: 0,
      currentCity: null
    }
    return this.http.post(`${this.uri}/users/register`, data);
  }
  connestion(city: string, languages: string[]) {
    const data = {
      city: city,
      languages: languages
    }
    return this.http.post(`${this.uri}/users/connestions`, data);
  }
  connect(username: string, username2: string) {
    const data = {
      username: username,
      username2: username2
    }
    return this.http.post(`${this.uri}/users/connect`, data);
  }

  allMyConnections(username: string) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/allMyConnections`, data);
  }
  updateCurrentCity(username: string, currentCity: string) {
    const data = {
      username: username,
      currentCity: currentCity
    }
    return this.http.post(`${this.uri}/users/updateCurrentCity`, data);

  }

}
