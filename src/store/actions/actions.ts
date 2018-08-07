
import { Action } from '@ngrx/store';
import { GeneralSetting, MonthWork, DayWork, EndDayId, SellCount } from '../state';
import { Counter } from '../../modules/counter-type';

export const SET_START_DATE:string = "SET_START_DATE";
export const START:string = "START";
export const DEFAULT:string = "DEFAULT";
export const RESET:string = "DEFAULT";
export const ADD_YEAR:string = "ADD_YEAR";
export const ADD_MONTH:string = "ADD_MONTH";
export const ADD_DAY:string = "ADD_DAY";
export const END_DAY:string = "END_DAY";
export const INC_SELL_COUNT:string = "INC_SELL_COUNT"



export class SetDateAction implements Action{
    readonly type: string = SET_START_DATE;  
    constructor(public payload:string){
    }
}

//export class AddYearAction implements Action{
//    readonly type: string = ADD_YEAR;  
//    constructor(public payload:MonthWork){
//    }
//}

export class AddMonthAction implements Action{
    readonly type: string = ADD_MONTH;  
    constructor(public payload:MonthWork){
    }
}

export class AddDayAction implements Action{
    readonly type: string = ADD_DAY;  
    constructor(public payload:DayWork){
    }
}

export class DefaultAction implements Action{
    readonly type: string = DEFAULT;  
    constructor(public payload:string){
    }
}

export class Reset implements Action{
    readonly type: string = RESET;
}


export class StartAction implements Action{
    readonly type: string = START;
    constructor(public payload:GeneralSetting){

    }
}

export class EndDayTime implements Action{
    readonly type: string = END_DAY;
    constructor(public payload:EndDayId){

    }
}

export class IncrementSellCount implements Action{
    readonly type: string = INC_SELL_COUNT;
    constructor(public payload:Counter){

    }
}

export type All = SetDateAction | DefaultAction | AddDayAction | AddMonthAction | StartAction | EndDayTime | IncrementSellCount;