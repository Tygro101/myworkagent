import { createStore } from 'redux'
import { saveState , loadState } from './localStoradg/localStoradg'
import { rootReducer } from './reducers/reducers'
 
const persistedState = loadState();

export const Store = createStore(
  rootReducer,
  persistedState);

export default () => {
  let store = createStore(
    rootReducer,
    persistedState)
};

Store.subscribe(()=>{
  saveState(Store.getState());
})


