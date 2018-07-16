import { Component } from '@angular/core';

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
export class SellCounterComponent {

  text: string;

  constructor() {
    console.log('Hello SellCounterComponent Component');
    this.text = 'Hello World';
  }

}
