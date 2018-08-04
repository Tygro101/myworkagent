import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import * as moment from 'moment';
import { Store } from "../../../node_modules/@ngrx/store";
import { getDateSelectore, getGeneralSettingsSelectore } from "../../store/selectors/selectors";
import { CurrentState, GeneralSetting } from "../../store/state";


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
  private handle:number;
  constructor(private store:Store<CurrentState>) {
    this.time = "00:00:00";
  }

  ngOnInit(): void {
  }

  public start(go:boolean, date:Date) {
    //this.date = new Date(date); // get date from storedge
    

    if(go){
      this.timeHolder = new TimeHolder(date);
      this.handle = setInterval(() => {
        this.Increment();
      }, 1000);
    }else{
      clearInterval(this.handle);
      this.time = "00:00:00";
    }
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
    return moment(new Date(0,0,0,this.hours,this.minutes,this.seconds)).format("HH:mm:ss");
  }
    
}
