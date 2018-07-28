import { NgModule } from "@angular/core";
import { WorkTimeComponent } from "./work-time/work-time";
import { SellCounterComponent } from "./sell-counter/sell-counter";
import { Store } from '../store/configureStore'
@NgModule({
  declarations: [WorkTimeComponent, SellCounterComponent],
  imports: [],
  exports: [WorkTimeComponent, SellCounterComponent]
})
export class ComponentsModule {
	
}
