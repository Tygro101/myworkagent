export interface AppState {
  generalSettings: GeneralSetting;

  years:Array<YearWork>;
  months:Array<MonthWork>;
  days:Array<DayWork>;
}

export interface GeneralSetting {
  start: boolean;
  startWorkDate: string;
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


export interface EndDayId{
  day:number;
  month:number;
  duration:number;
}
