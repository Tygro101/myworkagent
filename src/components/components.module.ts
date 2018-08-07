import { NgModule } from "@angular/core";
import { WorkTimeComponent } from "./work-time/work-time";
import { SellCounterComponent } from "./sell-counter/sell-counter";
import { Store } from '../store/configureStore'
import { DayCardComponent } from './day-card/day-card';
@NgModule({
  declarations: [WorkTimeComponent, SellCounterComponent,
    DayCardComponent],
  imports: [],
  exports: [WorkTimeComponent, SellCounterComponent,
    DayCardComponent]
})
export class ComponentsModule {
	
}
