import { Component, Input, OnInit } from '@angular/core';
import { MonthWork } from '../../store/state';

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
  

}
