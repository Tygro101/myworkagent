export interface AppState {
  generalSettings: GeneralSetting;
  startWorkDate: string;
  years:Array<YearWork>;
  month:Array<MonthWork>;
  day:Array<DayWork>;
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
    monthId:number;
    sellCount:number;
    workTime:number;
}

