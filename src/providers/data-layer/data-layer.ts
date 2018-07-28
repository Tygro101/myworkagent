import { Injectable } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppState } from '../../store/state';
import { getDateSelectore } from '../../store/selectors/selectors';
import { saveState } from '../../store/localStoradg/localStoradg';


/*
  Generated class for the DataLayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataLayerProvider {

  constructor(private store:Store<AppState>) {
    store.select(getDateSelectore).subscribe((state:AppState)=>{
      saveState(state);
    })
  }
}
