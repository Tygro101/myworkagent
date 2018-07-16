import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import * as moment from 'moment';


/**
 * Generated class for the WorkTimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "work-time",
  templateUrl: "work-time.html"
})
export class WorkTimeComponent implements OnInit {
  private time: string;
  private timeHolder: TimeHolder;
  private date:Date;
  constructor() {
    this.time = "00:00:00";
    
  }

  ngOnInit(): void {
    this.HandleTime();
  }

  private HandleTime(): void {
  }

  public start(go: boolean) {
    this.date = new Date(); // get date from storedge
    this.timeHolder = new TimeHolder(this.date);
    this.date.setSeconds(0);
    setInterval(() => {
      this.Increment();
    }, 1000);
  }

  private Increment():void{
    this.time = this.timeHolder.increment();
  }
}

class TimeHolder {
  private seconds: number;
  private minutes: number;
  private hours: number;
  constructor(private date:Date) {
    var duration = moment.duration(moment(new Date()).diff(date));
    this.hours = duration.get("hours");
    this.seconds = duration.get("seconds");
    this.minutes = duration.get("minutes");
  }

  public increment(): string {
    if (++this.seconds == 60) {
      this.seconds = 0;
      if (++this.minutes == 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    return this.hours +":" + this.minutes +":" + this.seconds;
  }
}
