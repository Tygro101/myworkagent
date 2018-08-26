import { Component, Input } from '@angular/core';
import { DayWork } from '../../store/state';
 
/**
 * Generated class for the DayCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'day-card',
  templateUrl: 'day-card.html'
})
export class DayCardComponent {
  @Input() day:DayWork;
  constructor() {
  }


  calcWorkTimeSalary(): number {
    return Number(((this.day.workTime.hours + this.day.workTime.minutes/60 + this.day.workTime.seconds/3600)*28.1).toFixed(4));
  }
  getWorkTimeString():string{
    return this.format(this.day.workTime.hours)+":"+ this.format(this.day.workTime.minutes)+":"+this.format(this.day.workTime.seconds);
  }
  public format(val:number):string{
    if(val<10){
      return '0'+val;
    }
    return val.toString();
  }
}
