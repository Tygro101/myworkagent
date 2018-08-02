export interface AppState {
  generalSettings: GeneralSetting;
  startWorkDate: string;
  years:Array<YearWork>;
  months:Array<MonthWork>;
  days:Array<DayWork>;
}

export interface GeneralSetting {
  start: boolean;
}

export interface CurrentState {
  state: AppState;
}

export interface YearWork{
    id:number;
}

export interface MonthWork{
    yearId:number;
    id:number;
    salay:number;
    bonuse:number;
    sellSumCount:number;
}

export interface DayWork{
    id:number;
    monthId:number;
    sellCount:number;
    workTime:number;
    date:string;
}

