import { createSelector, Selector } from "../../../node_modules/@ngrx/store";
import { AppState } from "../state";

export const getDateSelectore = (state: test) => state.state.startWorkDate;

export interface test {
  state: AppState;
}
