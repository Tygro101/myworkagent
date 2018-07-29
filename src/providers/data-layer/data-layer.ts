import { Injectable } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { getDateSelectore, getStateSelectore } from '../../store/selectors/selectors';
import { saveState } from '../../store/localStoradg/localStoradg';
import { AppState, CurrentState } from '../../store/state';


/*
  Generated class for the DataLayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataLayerProvider {

  constructor(private store:Store<CurrentState>) {
    store.select(getStateSelectore).subscribe((state:AppState)=>{
      saveState(state);
    })
  }
}
