export interface Counter{
    count:number;
    type:CounterType;
}


export enum CounterType{
    PLATINUM,
    GOLD,
    KIDS
}