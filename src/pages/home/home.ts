import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkTimeComponent } from '../../components/work-time/work-time'
import { Store } from '../../../node_modules/@ngrx/store';
import { AppState, CurrentState } from '../../store/state';
import * as Actions from '../../store/actions/actions';
import { saveState } from '../../store/localStoradg/localStoradg';
import { getDateSelectore } from '../../store/selectors/selectors';
import { Business } from '../../providers/business/business';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild(WorkTimeComponent) timeComponent: WorkTimeComponent;
  private inWork:boolean;
  private startButtonName:string;
  private startButtonColor:string;
  public  date:Date;
  constructor(public navCtrl: NavController, private business:Business, private store:Store<CurrentState>) {
    this.inWork = false;
    this.startButtonName = "Start";
    this.startButtonColor = "#007ac1";  
  }

  ngOnInit(): void {
    
  }

  toggleButtonName():void{
    this.inWork = !this.inWork;
    this.manageButton();

    if(this.inWork){
      this.date = this.business.getDayTime(new Date());//we should check here if we are in the same day.
      //this.store.dispatch(new Actions.SetDateAction(this.date.toJSON())); 
    }else{
      //store work time this day
    }
    this.timeComponent.start(this.inWork, this.date);
  }


  manageButton(): any {
    this.startButtonName = this.startButtonName == "Stop"?"Start":"Stop";
    this.startButtonColor = this.startButtonColor == "#007ac1"?"#c50e29":"#007ac1";
  }
}

