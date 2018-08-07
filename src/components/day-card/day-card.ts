import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello DayCardComponent Component');
    this.text = 'Hello World';
  }

}
