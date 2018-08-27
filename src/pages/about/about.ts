import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { State, Store } from "../../../node_modules/@ngrx/store";
import {
  AppState,
  GeneralSetting,
  MonthWork,
  DayWork,
  CurrentState
} from "../../store/state";
import { getStateSelectore } from "../../store/selectors/selectors";

@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  private months: MonthWork[];
  private days: DayWork[];
  public monthsWrapper: MonthWorkWrapper[];
  private state: AppState;
  constructor(
    public navCtrl: NavController,
    private store: Store<CurrentState>
  ) {
    store.select(getStateSelectore).subscribe((state: AppState) => {
      this.state = state;
      this.init();
    });
  }
  init(): void {
    if (this.state) {
      this.months = Object.assign([], this.state.months);
      this.days = Object.assign([], this.state.days);
      this.papulateMonthWrapper();
    }
  }
  papulateMonthWrapper(): void {
    this.monthsWrapper = [];
    this.months.forEach((month: MonthWork) => {
      this.monthsWrapper.push({
        month: month,
        days: this.days.filter((day: DayWork) => day.monthId == month.id)
      });
    });
    this.monthsWrapper = this.monthsWrapper.reverse();
  }
}

export interface MonthWorkWrapper {
  month: MonthWork;
  days: DayWork[];
}
