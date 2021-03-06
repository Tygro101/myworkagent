import { Component, ViewChild, OnInit } from "@angular/core";
import { NavController, ToastController, Toast } from "ionic-angular";
import { WorkTimeComponent } from "../../components/work-time/work-time";
import { Store, State } from "../../../node_modules/@ngrx/store";

import {
  AppState,
  CurrentState,
  GeneralSetting,
  WorkTime,
  SellCount,
  MonthWork,
  DayWork
} from "../../store/state";
import * as Actions from "../../store/actions/actions";
import { saveState } from "../../store/localStoradg/localStoradg";
import {
  getGeneralSettingsSelectore,
  currentMonthSelector,
  getMonthsSelectore,
  getStateSelectore
} from "../../store/selectors/selectors";
import { Business } from "../../providers/business/business";
import { Counter, CounterType } from "../../modules/counter-type";
import { HomeData } from "../../modules/home-data";
import { Observable } from "../../../node_modules/rxjs/Observable";
import { GetDateProvider } from "../../providers/get-date/get-date";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  @ViewChild(WorkTimeComponent)
  timeComponent: WorkTimeComponent;
  private inWork: boolean;
  private startButtonName: string;
  private dayWork: DayWork;
  public date: Date;
  private counters: Array<Counter>;
  public currentMonth: MonthWork;
  public months: MonthWork[];
  public defaultDate: Date;
  public showTimePickerDialog: boolean;
  private toast:Toast;

  constructor(
    public navCtrl: NavController,
    private business: Business,
    private store: Store<CurrentState>,
    private state: State<AppState>,
    private getDate: GetDateProvider,
    private toastCtrl: ToastController
  ) {
    this.inWork = false;
    this.startButtonName = "התחל";
    this.initCounters();
    this.defaultDate = getDate.getNewDate();
    this.showTimePickerDialog = false;  
  } 

  ngOnInit(): void {
    var generalSetting: GeneralSetting = this.state.getValue().state
      .generalSettings;
    this.inWork = generalSetting.start;
    this.date = new Date(generalSetting.startWorkDate);
    this.manageButton();
    if (this.inWork) {
      this.dayWork = this.business.getCurrentDay(this.date);
      this.initCounters(this.dayWork.sellCount);
      this.timeComponent.start(
        this.date,
        this.dayWork ? this.dayWork.workTime : null
      );
    }
    this.store.select(getStateSelectore).subscribe((state: AppState) => {
      this.months = state.months.filter(
        (month: MonthWork) =>
          (month.yearId = this.defaultDate.getFullYear()) &&
          month.id == this.defaultDate.getMonth() + 1
      );
    });
  }

  toggleButtonName(): void {
    this.inWork = !this.inWork;
    this.manageButton();

    if (this.inWork) {
      this.date = this.getDate.getNewDate();
      this.dayWork = this.business.getDayTime(this.date);
      this.timeComponent.start(this.date, this.dayWork.workTime);
      this.initCounters(this.dayWork.sellCount);
    } else {
      var workTime: WorkTime = this.timeComponent.stop();
      this.dayWork.workTime = workTime;
      this.business.endDayTime(this.dayWork);
      this.initCounters();
    }
  }

  manageButton(): any {
    this.startButtonName = !this.inWork ? "התחל" : "הפסק";
  }

  counterChange(counter: Counter, action: string) {
    if (this.inWork) {
      action === "up" ? counter.count++ : counter.count--;
      this.store.dispatch(new Actions.IncrementSellCount(counter));
    }else{
      this.showToast();
    }
  }

  private initCounters(sellCount?: SellCount) {
    this.counters = new Array<Counter>();
    this.counters.push({
      count: sellCount ? sellCount.kids : 0,
      type: CounterType.KIDS
    });
    this.counters.push({
      count: sellCount ? sellCount.gold : 0,
      type: CounterType.GOLD
    });
    this.counters.push({
      count: sellCount ? sellCount.platinum : 0,
      type: CounterType.PLATINUM
    });
  }

  openDialog() {
    if (this.inWork) {
      this.showTimePickerDialog = true;
    }else{
      this.showToast();
    }
  }

  closeAndUpdate(event: WorkTime) {
    this.showTimePickerDialog = false;

    this.timeComponent.setTime(event);

    //if(event.startTime && event.endTime){
    //var m = moment(event.startTime, 'HH:mm:ss')
    //console.log(m.date());
    //var startDate:Date = new Date(event.startTime);
    //var endDate:Date = new Date(event.startTime);

    //this.store.dispatch(new )

    //this.timeComponent.setTime();
    // }
  }
  
  showToast(){
    this.toast = this.createToast();
    this.toast.present();
  }

  createToast():Toast{
    return this.toastCtrl.create({
      message: 'התחל יום עבודה קודם',
      duration: 3000,
      position: 'top',
      cssClass: 'toast-class'
    });
  }
}
