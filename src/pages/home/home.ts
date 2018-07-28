import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkTimeComponent } from '../../components/work-time/work-time'
import { Store } from '../../../node_modules/@ngrx/store';
import { AppState } from '../../store/state';
import * as Actions from '../../store/actions/actions';
import { saveState } from '../../store/localStoradg/localStoradg';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(WorkTimeComponent) timeComponent: WorkTimeComponent;
  private inWork:boolean;
  private startButtonName:string;
  private startButtonColor:string;
  constructor(public navCtrl: NavController, private store:Store<AppState>) {
    this.inWork = false;
    this.startButtonName = "Start";
    this.startButtonColor = "#007ac1";
    store.select((state:AppState)=>state).subscribe((state:AppState)=>{
      saveState(state);
    });
    store.dispatch(new Actions.SetDateAction(new Date().toDateString()));
  
  }

  toggleButtonName():void{
    this.startButtonName = this.startButtonName == "Stop"?"Start":"Stop";
    this.startButtonColor = this.startButtonColor == "#007ac1"?"#c50e29":"#007ac1";
    this.inWork = !this.inWork;
    this.timeComponent.start(this.inWork);
  }
}
