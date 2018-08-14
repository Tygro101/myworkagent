import { AppState, GeneralSetting, DayWork, EndDayId, MonthWork, WorkTime } from '../state'
import * as Actions from '../actions/actions'
export type Action = Actions.All;
import { saveState , loadState } from '../localStoradg/localStoradg'
import { Counter, CounterType } from '../../modules/counter-type';


const persistedState = loadState();

export function rootReducer(state:AppState = persistedState, action:Action):AppState{
    switch(action.type){
        case Actions.START:
            return {...state, generalSettings:<GeneralSetting>action.payload}

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

        case Actions.ADD_MONTH:
            var month:MonthWork = <MonthWork>action.payload;
            var months:MonthWork[] = state.months;
            months.push(month);
            return {...state, months:months};

        case Actions.UPDATE_MONTH:
            var month:MonthWork = action.payload as MonthWork;
            var months:MonthWork[] = state.months;
            months.pop();
            months.push(month);
            return {...state, months:months};


        case Actions.END_DAY:
            return EndDayWork(state, action.payload as DayWork);

        case Actions.INC_SELL_COUNT:
            return AddCount(state,<Counter>action.payload);

    }
    return state;
}


function EndDayWork(state:AppState, dayWork:DayWork):AppState{
    //var dayId:EndDayId = <EndDayId>action.payload;
    var days:DayWork[] = Object.assign([], state.days)
    days.pop();
    days.push(dayWork);
    return {...state, days:days};
}

function AddCount(state:AppState, counter:Counter){
    var days:DayWork[] = Object.assign([],state.days);
    var day:DayWork = days.pop();
    var months:MonthWork[] = Object.assign([],state.months);
    var month:MonthWork = months.pop();
    switch(counter.type){
        case CounterType.GOLD:
            day.sellCount.gold += 1;
            month.sellSumCount.gold += 1;
            break;
        case CounterType.PLATINUM:
            day.sellCount.platinum += 1;
            month.sellSumCount.platinum += 1;
            break;
        case CounterType.KIDS:
            day.sellCount.kids += 1;
            month.sellSumCount.kids += 1;
            break;          
    }
    days.push(day);
    months.push(month);
    return {...state, days:days, months:months};
}


