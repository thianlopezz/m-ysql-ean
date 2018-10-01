import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HolaMundoService {

  constructor(private http: Http) { }

  getHolaMundo(){
    return this.http.get('/priv/hola')
            .pipe(map((response: Response) => response.json()));

  }

  postHolaMundo(){
    return this.http.post('/priv/hola', {})
            .pipe(map((response: Response) => response.json()));

  }

  putHolaMundo(){
    return this.http.post('/priv/hola', {})
            .pipe(map((response: Response) => response.json()));

  }
}
