import { Component, OnInit } from '@angular/core';
import { HolaMundoService } from './hola-mundo.service';

@Component({
  selector: 'app-hola-mundo',
  templateUrl: './hola-mundo.component.html',
  styleUrls: ['./hola-mundo.component.css']
})
export class HolaMundoComponent implements OnInit {

  holaGet;
  holaPost;
  holaPut;

  constructor(private holaMundoService: HolaMundoService) { }

  ngOnInit() {
    this.getHolas();
  }

  getHolas(){
    
    this.holaMundoService.getHolaMundo()
    .subscribe(response=>{
      this.holaGet = JSON.stringify(response);
    }, error=>{
      console.log('Hubo un error por get', error);
    });
    
    this.holaMundoService.postHolaMundo()
    .subscribe(response=>{
      this.holaPost = JSON.stringify(response);
    }, error=>{
      console.log('Hubo un error por post', error);
    });
    
    this.holaMundoService.putHolaMundo()
    .subscribe(response=>{
      this.holaPut = JSON.stringify(response);
    }, error=>{
      console.log('Hubo un error por put', error);
    });
  }

}
