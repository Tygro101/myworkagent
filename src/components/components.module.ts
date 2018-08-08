import { NgModule } from "@angular/core";
import { WorkTimeComponent } from "./work-time/work-time";
import { SellCounterComponent } from "./sell-counter/sell-counter";
import { Store } from '../store/configureStore'
import { DayCardComponent } from './day-card/day-card';
import { SellComponent } from './sell/sell';
@NgModule({
  declarations: [WorkTimeComponent, SellCounterComponent,
    DayCardComponent,
    SellComponent],
  imports: [],
  exports: [WorkTimeComponent, SellCounterComponent,
    DayCardComponent,
    SellComponent]
})
export class ComponentsModule {
	
}
