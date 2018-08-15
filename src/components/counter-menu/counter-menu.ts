import { Component } from '@angular/core';

/**
 * Generated class for the CounterMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'counter-menu',
  templateUrl: 'counter-menu.html'
})
export class CounterMenuComponent {

  text: string;

  constructor() {
    console.log('Hello CounterMenuComponent Component');
    this.text = 'Hello World';
  }

}
