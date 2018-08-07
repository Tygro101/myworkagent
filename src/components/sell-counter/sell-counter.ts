import { Component, Input, OnInit } from '@angular/core';
import { CounterType } from '../../modules/counter-type';

/**
 * Generated class for the SellCounterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sell-counter',
  templateUrl: 'sell-counter.html'
})
export class SellCounterComponent implements OnInit {


  public countValue:number;
  @Input() count:number;
  @Input() type:CounterType;

  ngOnInit(): void {
  }
  
}
