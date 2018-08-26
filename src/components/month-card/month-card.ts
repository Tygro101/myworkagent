import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MonthWork, SellCount } from '../../store/state';
import { TitleCasePipe } from '../../../node_modules/@angular/common';

/**
 * Generated class for the MonthCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'month-card',
  templateUrl: 'month-card.html'
})
export class MonthCardComponent implements OnInit {
  @Input() month:MonthWork;

  public workTime:string;
  public workTimeSalary:number;

  constructor() {
    
  }


  ngOnInit(): void {
  }

  public format(val:number):string{
    if(val<10){
      return '0'+val;
    }
    return val.toString();
  }


  setView():void{
    this.workTime = this.getWorkTimeString();
    this.workTimeSalary = this.calcWorkTimeSalary()
  }
  calcWorkTimeSalary(): number {
    return Number(((this.month.workTime.hours + this.month.workTime.minutes/60 + this.month.workTime.seconds/3600)*29).toFixed(4));
  }
  getWorkTimeString():string{
    return this.format(this.month.workTime.hours)+":"+ this.format(this.month.workTime.minutes)+":"+this.format(this.month.workTime.seconds);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['month']) {
      this.setView();
    }
  }

  calcBonos():number{
    var sells:SellCount = this.month.sellSumCount;
    if(sells.platinum>49 && sells.kids>18){
      return sells.platinum*55;
    }
    else if(sells.platinum>44 && sells.kids>17){
      return sells.platinum*50;
    }
    else if(sells.platinum>39 && sells.kids>15){
      return sells.platinum*45;
    }
    else if(sells.platinum>34 && sells.kids>14){
      return sells.platinum*40;
    }
    else if(sells.platinum>29 && sells.kids>12){
      return sells.platinum*30;
    }
    else if(sells.platinum>25 && sells.kids>10){
      return sells.platinum*15;
    }
    else if(sells.platinum>20 && sells.kids>9){
      return sells.platinum*10;
    }
    else if(sells.kids>7){
      return sells.platinum*5;
    }
    return 0;
  }

  salary():number{
    return this.calcBonos() + this.calcWorkTimeSalary();
  }
}
