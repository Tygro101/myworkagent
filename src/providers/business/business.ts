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

    //if(!year){
    //  this.store.dispatch(new Actions.AddYearAction());
    //}
    if (!months || !months.find(month => month.id == date.getMonth() + 1)) {
      this.store.dispatch(
        new Actions.AddMonthAction({
          bonuse: 0,
          id: date.getMonth() + 1,
          salay: 0,
          sellSumCount: {
            gold: 0,
            kids: 0,
            platinum: 0
          },
          yearId: date.getFullYear()
        })
      );
    }
    if (!days || !days.find((day: DayWork) => (day.id == date.getDate()) && (day.monthId == date.getMonth() + 1))) {
      this.store.dispatch(
        new Actions.AddDayAction({
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
        })
      );
    }

    this.store.dispatch(
      new Actions.StartAction({
        startWorkDate: date.toJSON(),
        start: true
      })
    );
    var daysWork: DayWork[] = this.state.days.filter(
      (day: DayWork) =>
        day.monthId == date.getMonth() + 1 && day.id == date.getDate()
    );
    if (daysWork && daysWork.length > 0) {
      return {
        sellCount:daysWork[0].sellCount,
        workTime:daysWork[0].workTime
      }//daysWork[0].workTime;
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
}
