import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  bringWords(){
    return this.http.get('http://localhost:4000/game/getWord');
  }

  updateHits(hits){
    const data={
      hits: hits,
    }
    return this.http.post('http://localhost:4000/game/updateHits', data);
  }
}
