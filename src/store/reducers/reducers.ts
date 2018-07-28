import { AppState } from '../state'
import * as Actions from '../actions/actions'
export type Action = Actions.All;
import { saveState , loadState } from '../localStoradg/localStoradg'


const persistedState = loadState();

export function rootReducer(state:AppState = persistedState, action:Action):AppState{
    switch(action.type){
        case Actions.SET_START_DATE:
            return {...state, startWorkDate:action.payload}
        case Actions.DEFAULT:
            return state;
        case Actions.RESET:
            return persistedState;
    }
    return state;
}