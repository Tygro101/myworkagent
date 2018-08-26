import { Component } from '@angular/core';

/**
 * Generated class for the CounterPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'counter-picker',
  templateUrl: 'counter-picker.html'
})
export class CounterPickerComponent {

  text: string;

  constructor() {
    console.log('Hello CounterPickerComponent Component');
    this.text = 'Hello World';
  }

}
