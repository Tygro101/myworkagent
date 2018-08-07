import { createSelector, Selector } from "../../../node_modules/@ngrx/store";
import { AppState, CurrentState } from "../state";

export const getDateSelectore = (state: CurrentState) => state.state.generalSettings.startWorkDate;
export const getStateSelectore = (state: CurrentState) => state.state;
export const getGeneralSettingsSelectore = (state: CurrentState) => state.state.generalSettings;
export const getStateSelectore1 = (state: CurrentState) => state.state.days;

export const selectCustomer = createSelector(
    getStateSelectore1, 
    customers => (id: string) => customers[id]
  );


