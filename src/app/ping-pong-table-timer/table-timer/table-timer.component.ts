import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-table-timer',
  templateUrl: './table-timer.component.html',
  styleUrls: ['./table-timer.component.css']
})
export class TableTimerComponent implements OnChanges, OnInit {

  clock: any;
  minutes: any = '00';
  hours: any = '00';
  public hoursPassed = 0;
  seconds: any = '00';
  milliseconds: any = '00';
  public payment: number = 0;
  hourlyRate: number = 400;
  public timeStarted: any;
  public limited!: boolean | undefined;

  @Input() start!: boolean;
  @Input() showTimerControls!: boolean;
  showLimitedButton = true;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['start']);
    if (changes['start'].currentValue) {
      this.startTimer();
    } else {
      this.clearTimer();
    }
  }

  laps: any = [];
  counter!: number;
  timerRef !: any;
  running: boolean = false;
  startText = 'Start';


  startTimer() {
    // const source = timer(0, Date.now());
    // const subscribe = source.subscribe(val => console.log(val));
    this.showLimitedButton = false;
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timeStarted = startTime;
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.minutes = Math.floor(Math.floor(this.counter % 3600000) / 60000).toFixed(0);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        this.hours = Math.floor(this.counter / 3600000);
        this.payment = Number(Math.round(this.hourlyRate / 60 * Number(Math.floor(this.counter / 60000))).toFixed(2));
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
        if (Number(this.hours) < 10) {
          this.hours = '0' + this.hours;
        } else {
          this.hours = '' + this.hours;
        }
        if (Number(this.minutes) == 60) {
          this.minutes = '00'
        }
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  lapTimeSplit() {
    let lapTime = this.minutes + ':' + this.seconds + ':' + this.milliseconds;
    this.laps.push(lapTime);
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = 0;
    this.milliseconds = '00',
      this.seconds = '00',
      this.minutes = '00';
    this.hours = '00';
    this.timeStarted = '';
    this.payment = 0
    this.laps = [];

    this.limited = undefined;

    this.showLimitedButton = true;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  ngOnInit() {
  }

  chooseForm($event: boolean) {
    if (this.limited != $event)
      this.clearTimer();

    this.limited = $event;
  }

  startLimitedTimer($event: any) {
    debugger
  }
}
