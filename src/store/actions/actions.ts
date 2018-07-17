


export interface Action{
    type:string;
}

export const SET_START_DATE:string = "SET_START_DATE";
export const DEFAULT:string = "DEFAULT";

export class SetDateAction implements Action{
    readonly type: string = SET_START_DATE;  
    constructor(public payload){
    }
}

export class DefaultAction implements Action{
    readonly type: string = DEFAULT;  
    constructor(public payload){
    }
}


export type All = SetDateAction | DefaultAction;