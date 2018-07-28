
import { Action } from '@ngrx/store';

export const SET_START_DATE:string = "SET_START_DATE";
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


export type All = SetDateAction | DefaultAction;