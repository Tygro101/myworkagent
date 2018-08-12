import { createSelector, Selector, MemoizedSelector } from "../../../node_modules/@ngrx/store";
import { AppState, CurrentState, DayWork, MonthWork } from "../state";

export const getDateSelectore = (state: CurrentState) => state.state.generalSettings.startWorkDate;
export const getStateSelectore = (state: CurrentState) => state.state;
export const getGeneralSettingsSelectore = (state: CurrentState) => state.state.generalSettings;
export const getDaysSelectore = (state: CurrentState):DayWork[] => state.state.days;
export const getMonthsSelectore = (state: CurrentState):MonthWork[] => state.state.months;



export function currentMonthSelector(monthID:number):MemoizedSelector<CurrentState, MonthWork[]>{
    let monthSelector = createSelector(getStateSelectore,(state:AppState)=>(state.months||[]).filter((month:MonthWork)=>month.id == monthID));
    return monthSelector;
}




