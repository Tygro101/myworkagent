import { createSelector, Selector } from "../../../node_modules/@ngrx/store";
import { AppState, CurrentState } from "../state";

export const getDateSelectore = (state: CurrentState) => state.state.generalSettings.startWorkDate;
export const getStateSelectore = (state: CurrentState) => state.state;
export const getGeneralSettingsSelectore = (state: CurrentState) => state.state.generalSettings;

