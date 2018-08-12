import { Injectable } from "@angular/core";
import { Store } from "../../../node_modules/@ngrx/store";
import {
  getDateSelectore,
  getStateSelectore
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
import { HomeData } from "../../modules/home-data";
import { Action } from "../../../node_modules/rxjs/scheduler/Action";

/*
  Generated class for the DataLayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
      (day: DayWork) => (day.monthId = date.getMonth() + 1) && (day.id == date.getDate())
    );
    if (days.length > 0) return days[0];
    return null;
  }

  public getDayTimeIfExist(date: Date) {
    let days: DayWork[] = this.state.days.filter(
      (day: DayWork) => (day.monthId = date.getMonth() + 1)
    );
    if (days && days.find(day => day.id == date.getDate())) {
      return new Date(
        this.state.days.filter(
          (day: DayWork) =>
            (day.monthId = date.getMonth() + 1) && day.id == date.getDate()
        )[0].date
      );
    }
    return null;
  }

  public getDayTime(date: Date): HomeData {
    let year: YearWork = this.state.years.filter(
      (year: YearWork) => (year.id = date.getFullYear())
    )[0];
    let months: MonthWork[] = this.state.months.filter(
      (month: MonthWork) => (month.yearId = date.getFullYear())
    );
    let days: DayWork[] = this.state.days.filter(
      (day: DayWork) => (day.monthId = date.getMonth() + 1)
    );

    var currentDay: DayWork = days.find(
      (day: DayWork) => day.id == date.getDate()
    );
    var currentMonth: MonthWork = months.find(
      month => month.id == date.getMonth() + 1
    );

    if (currentDay && currentMonth) {
      currentMonth.workTime = this.subtractWorkTime(
        currentMonth.workTime,
        currentDay.workTime
      );
      this.store.dispatch(new Actions.UpdateMonthAction(currentMonth));
    } else {
      if (!days || !currentDay) {
        currentDay = {
          date: date.toJSON(),
          id: date.getDate(),
          monthId: date.getMonth() + 1,
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
        this.store.dispatch(new Actions.AddDayAction(currentDay));
      }

      if (!months || !currentMonth) {
        currentMonth = {
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
        this.store.dispatch(new Actions.AddMonthAction(currentMonth));
      }
    }

    this.store.dispatch(
      new Actions.StartAction({
        startWorkDate: date.toJSON(),
        start: true
      })
    );

    //var daysWork: DayWork[] = this.state.days.filter(
    //  (day: DayWork) =>
    //    day.monthId == date.getMonth() + 1 && day.id == date.getDate()
    //);
    if (currentDay) {
      return {
        sellCount: currentDay.sellCount,
        workTime: currentDay.workTime
      }; //daysWork[0].workTime;
    }
    return null;
    //}else{
    //return new Date(this.state.days.filter((day:DayWork)=>(day.monthId = date.getMonth()+1) && (day.id == date.getDate()))[0].date);
  }

  endDayTime(date: Date, workTime: WorkTime) {
    this.store.dispatch(
      new Actions.EndDayTime({
        day: date.getDate(),
        month: date.getMonth() + 1,
        duration: workTime
      })
    );
  }

  subtractWorkTime(month: WorkTime, day: WorkTime): WorkTime {
    return {
      hours: month.hours - day.hours,
      minutes: month.minutes - day.minutes,
      seconds: month.seconds - day.seconds
    };
  }
}
