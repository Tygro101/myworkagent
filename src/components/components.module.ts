import { NgModule } from "@angular/core";
import { WorkTimeComponent } from "./work-time/work-time";
import { SellCounterComponent } from "./sell-counter/sell-counter";
import { Store } from '../store/configureStore'
import { DayCardComponent } from './day-card/day-card';
import { SellComponent } from './sell/sell';
import { MonthCardComponent } from './month-card/month-card';
import { BrowserModule } from "../../node_modules/@angular/platform-browser";
import { CounterPickerComponent } from './counter-picker/counter-picker';

@NgModule({
  declarations: [WorkTimeComponent, SellCounterComponent,
    DayCardComponent,
    SellComponent,
    MonthCardComponent,
    CounterPickerComponent],
  imports: [BrowserModule],
  exports: [WorkTimeComponent, SellCounterComponent,
    DayCardComponent,
    SellComponent,
    MonthCardComponent,
    CounterPickerComponent]
})
export class ComponentsModule {
	
}
