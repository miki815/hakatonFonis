import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KvizService {

  constructor(private http: HttpClient) {}

  getQuestion(){
    return this.http.get('http://localhost:4000/game/getQuestion');
  }

  getQuestionById(id){
    return this.http.post('http://localhost:4000/game/getQuestionById' , {id: id});
  }
}
