import { Component } from '@angular/core';

/**
 * Generated class for the SellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sell',
  templateUrl: 'sell.html'
})
export class SellComponent {

  text: string;

  constructor() {
    console.log('Hello SellComponent Component');
    this.text = '1';
  }

}
