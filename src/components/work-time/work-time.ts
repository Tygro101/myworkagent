import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { Store } from "../../../node_modules/@ngrx/store";
import {
  getDateSelectore,
  getGeneralSettingsSelectore
} from "../../store/selectors/selectors";
import {
  CurrentState,
  WorkTime
} from "../../store/state";
import { GetDateProvider } from "../../providers/get-date/get-date";


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
  private handle: number;
  constructor(private store: Store<CurrentState>, private getDate:GetDateProvider) {
    this.time = "00:00:00";
  }

  ngOnInit(): void {}

  public start(date: Date, workTime: WorkTime): void {
    //this.date = new Date(date); // get date from storedge

    this.timeHolder = new TimeHolder(date, workTime, this.getDate);
    this.handle = setInterval(() => {
      this.Increment();
    }, 1000);
  }

  public stop(): WorkTime {
    clearInterval(this.handle);
    this.time = "00:00:00";
    return this.timeHolder.getWorkTime();
  }

  private Increment(): void {
    this.time = this.timeHolder.increment();
  }

  public setTime(time:WorkTime): void{
    this.timeHolder.setTime(time);
  }
}

class TimeHolder {
  private seconds: number;
  private minutes: number;
  private hours: number;
  private stop: boolean;
  constructor(private date: Date, private workTime: WorkTime, getDate:GetDateProvider) {

    if(workTime){
      date.setHours(date.getHours() - workTime.hours);
      date.setMinutes(date.getMinutes() - workTime.minutes);
      date.setSeconds(date.getSeconds() - workTime.seconds);
    }

    if(date){
      var duration = moment.duration(moment(getDate.getNewDate()).diff(date));

      this.hours = duration.get("hours"); //if hours > 9 what should we do?      
      this.seconds = duration.get("seconds");
      this.minutes = duration.get("minutes");
    }
  }

  public increment(): string {
    if (!this.stop) {
      if (++this.seconds == 60) {
        this.seconds = 0;
        if (++this.minutes == 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }
    return moment(
      new Date(0, 0, 0, this.hours, this.minutes, this.seconds)
    ).format("HH:mm:ss");
  }

  public getWorkTime(): WorkTime {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds
    };
  }

  public setTime(time:WorkTime){
    this.hours = time.hours;
    this.minutes = time.minutes;
    this.seconds = time.seconds;
     
  }
}
