import { State } from '../state'
import * as Actions from '../actions/actions'
export type Action = Actions.All;

export function rootReducer(state:State, action:Action):State{
    switch(action.type){
        case Actions.SET_START_DATE:
            return {...state, startWorkDate:action.payload}
        case Actions.DEFAULT:
            return state;
    }
    return state;
}