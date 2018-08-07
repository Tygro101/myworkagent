import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkTimeComponent } from '../../components/work-time/work-time'
import { Store, State } from '../../../node_modules/@ngrx/store';
import { AppState, CurrentState, GeneralSetting } from '../../store/state';
import * as Actions from '../../store/actions/actions';
import { saveState } from '../../store/localStoradg/localStoradg';
import { getGeneralSettingsSelectore, selectCustomer } from '../../store/selectors/selectors';
import { Business } from '../../providers/business/business';
import { Counter, CounterType } from '../../modules/counter-type';

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
  private counters:Array<Counter>;



  constructor(public navCtrl: NavController, private business:Business, private store:Store<CurrentState>, private state: State<AppState>) {
    this.inWork = false;
    this.startButtonName = "Start";  
    this.initCounters();
  }

  ngOnInit(): void {
        var generalSetting:GeneralSetting = this.state.getValue().state.generalSettings;
        this.inWork = generalSetting.start;
        this.date = new Date(generalSetting.startWorkDate);
        this.manageButton();
        if(this.inWork){
          this.timeComponent.start(this.inWork, this.date);
        }
        
  }


  toggleButtonName():void{
    this.inWork = !this.inWork;
    this.manageButton();

    if(this.inWork){
      this.date = this.business.getDayTime(new Date());//we should check here if we are in the same day.
      //this.store.dispatch(new Actions.SetDateAction(this.date.toJSON())); 
    }else{
      this.business.endDayTime(this.date);
      this.initCounters();
    }
    this.timeComponent.start(this.inWork, this.date);
  }


  manageButton(): any {
    this.startButtonName = !this.inWork?"Start":"Stop";
  }

  incCounter(counter:Counter){
    if(this.inWork){
      counter.count++;
      this.store.dispatch(new Actions.IncrementSellCount(counter));
    }
  }

  private initCounters(){
    this.counters = new Array<Counter>();
    this.counters.push({count:0,type:CounterType.KIDS});
    this.counters.push({count:0,type:CounterType.GOLD});
    this.counters.push({count:0,type:CounterType.PLATINUM});
  }
}

