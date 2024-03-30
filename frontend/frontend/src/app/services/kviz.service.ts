import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KvizService {

  constructor(private http: HttpClient) { }

  getQuestion(qtype: string) {
    let data = {
      city: "Belgrade",
      qtype: qtype
    }
    return this.http.post('http://localhost:4000/kviz/getQuestion', data);
  }

  getQuestionById(id) {
    return this.http.post('http://localhost:4000/kviz/getQuestionById', { id: id });
  }

  saveScore(username, score) {
    let data = {
      username: username,
      score: score
    }
    return this.http.post('http://localhost:4000/kviz/saveScore', data);
  }
}
