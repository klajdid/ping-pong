import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ping-Pong';

  _start=false;
  constructor(){
  }

  ngOnInit(){
  }

  start(){
    this._start=true;
  }
  clear(){
    this._start=false;
  }
}
