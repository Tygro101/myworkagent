import { AppState, GeneralSetting, DayWork } from '../state'
import * as Actions from '../actions/actions'
export type Action = Actions.All;
import { saveState , loadState } from '../localStoradg/localStoradg'


const persistedState = loadState();

export function rootReducer(state:AppState = persistedState, action:Action):AppState{
    switch(action.type){
        case Actions.START:
            return Object.assign({},state,action.payload);
        case Actions.SET_START_DATE:
            return Object.assign({},state,action.payload);
        case Actions.DEFAULT:
            return state;
        case Actions.RESET:
            return persistedState;
        case Actions.ADD_DAY:
            var day:DayWork = <DayWork>action.payload;
            var days:DayWork[] = state.days;
            days.push(day);
            //var days = state.days.push(action.payload.valueOf)
            return {...state, days:days};
    }
    return state;
}