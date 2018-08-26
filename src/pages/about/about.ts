import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { State } from '../../../node_modules/@ngrx/store';
import { AppState, GeneralSetting, MonthWork, DayWork } from '../../store/state';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{
  private months:MonthWork[];
  private days:DayWork[];
  public monthsWrapper:MonthWorkWrapper[];
  constructor(public navCtrl: NavController, private state: State<AppState>) {
    
  }
  ngOnInit(): void {
    this.months = this.state.getValue().state.months;
    this.days = this.state.getValue().state.days;
    this.papulateMonthWrapper();
  }
  papulateMonthWrapper(): void {
    this.monthsWrapper = [];
    this.months.forEach((month:MonthWork)=>{
      this.monthsWrapper.push({month:month, days:this.days.filter((day:DayWork)=> day.monthId = month.id)})
    })
    console.log(this.monthsWrapper);
  }
}

export interface MonthWorkWrapper{
  month:MonthWork;
  days:DayWork[]
}