
import { Action } from '@ngrx/store';
import { GeneralSetting } from '../state';

export const SET_START_DATE:string = "SET_START_DATE";
export const START:string = "START";
export const DEFAULT:string = "DEFAULT";
export const RESET:string = "DEFAULT";

export class SetDateAction implements Action{
    readonly type: string = SET_START_DATE;  
    constructor(public payload:string){
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

export type All = SetDateAction | DefaultAction;