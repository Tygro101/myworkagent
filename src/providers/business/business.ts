import { Injectable } from "@angular/core";
import { Store } from "../../../node_modules/@ngrx/store";
import {
  getStateSelectore, getMonthsSelectore
} from "../../store/selectors/selectors";
import { saveState } from "../../store/localStoradg/localStoradg";
import {
  AppState,
  CurrentState,
  DayWork,
  YearWork,
  MonthWork,
  WorkTime
} from "../../store/state";
import * as Actions from "../../store/actions/actions";


@Injectable()
export class Business {
  private state: AppState;
  constructor(private store: Store<CurrentState>) {
    store.select(getStateSelectore).subscribe((state: AppState) => {
      this.state = state;
      console.log(state);
      saveState(state);
    });
  }

  public getCurrentDay(date: Date): DayWork {
    let days: DayWork[] = this.state.days.filter(
      (day: DayWork) =>
        (day.monthId = date.getMonth() + 1) && day.id == date.getDate()
    );
    if (days.length > 0) return days[0];
    return null;
  }

  public getDayTime(date: Date): DayWork {
    let years: YearWork[] = this.state.years;
    let months: MonthWork[] = this.state.months;
    let days: DayWork[] = this.state.days;

    let currentMonth: MonthWork = months[months.length>0?months.length-1:0];
    let currentDay: DayWork = days[days.length>0?days.length-1:0];


      if (!currentDay || currentDay.id != date.getDate() || currentDay.monthId != (date.getMonth()+1) || currentDay.yearId != date.getFullYear()) {
        currentDay = this.getDefualtDay(date);
        this.store.dispatch(new Actions.AddDayAction(currentDay));
      }

      if (!currentMonth || currentMonth.id != (date.getMonth()+1) || currentMonth.yearId != date.getFullYear()) {
        currentMonth = this.getDefualtMonth(date);
        this.store.dispatch(new Actions.AddMonthAction(currentMonth));
      }
    

    this.store.dispatch(
      new Actions.StartAction({
        startWorkDate: date.toJSON(),
        start: true
      })
    );
    return currentDay;
  }

  endDayTime(dayWork:DayWork):void {
    var months:MonthWork[] =  Object.assign([],this.state.months);
    var updatedMonth:MonthWork = months.pop();
    updatedMonth.workTime = this.updateMonth(updatedMonth);
    this.store.dispatch(
      new Actions.EndDayTime(dayWork)
    );
    this.store.dispatch(
      new Actions.StartAction({
        startWorkDate: '',
        start: false
      })
    );
    this.store.dispatch(
      new Actions.UpdateMonthAction(updatedMonth)
    );
  }

  private updateMonth(monthWork:MonthWork):WorkTime{
    var days:DayWork[] = this.state.days;
    return days.filter((dayWork:DayWork)=> dayWork.monthId == monthWork.id && dayWork.yearId == monthWork.yearId).map((dayWork:DayWork)=> dayWork.workTime)
    .reduce((sumValue:WorkTime,currentValue:WorkTime)=> this.sumWorkTime(sumValue,currentValue))
  }

  sumWorkTime(sum: WorkTime, current: WorkTime): WorkTime {
    var second:number = sum.seconds + current.seconds;
    var minutes = sum.minutes + current.minutes;
    var hours = sum.hours + current.hours;
    if(second>60){
        second = second - 60;
        minutes++;
    }
    if(minutes>60){
        minutes = minutes - 60;
        hours++;
    }
    return {
      hours: hours,
      minutes: minutes,
      seconds: second
    }
  }

  private getDefualtDay(date: Date): DayWork {
    return {
      date: date.toJSON(),
      id: date.getDate(),
      monthId: date.getMonth() + 1,
      yearId: date.getFullYear(),
      sellCount: {
        gold: 0,
        kids: 0,
        platinum: 0
      },
      workTime: {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    };
  }

  private getDefualtMonth(date: Date): MonthWork {
    return {
      bonuse: 0,
      id: date.getMonth() + 1,
      salay: 0,
      sellSumCount: {
        gold: 0,
        kids: 0,
        platinum: 0
      },
      workTime: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      yearId: date.getFullYear()
    };
  }
}
