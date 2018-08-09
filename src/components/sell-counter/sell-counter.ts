import { Component, Input, OnInit } from "@angular/core";
import { CounterType } from "../../modules/counter-type";
import { Store } from "../../../node_modules/@ngrx/store";
import { CurrentState, DayWork, SellCount } from "../../store/state";
import { getDaysSelectore } from "../../store/selectors/selectors";

/**
 * Generated class for the SellCounterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "sell-counter",
  templateUrl: "sell-counter.html"
})
export class SellCounterComponent implements OnInit {
  public countValue: number;
  @Input() count: number;
  @Input() type: CounterType;
  currentDayId: number;
  sumCount: SellCount;

  constructor(private store: Store<CurrentState>) {
    this.currentDayId = new Date().getDate();
    store.select(getDaysSelectore).subscribe((days: DayWork[]) => {
      this.sumCount = {platinum:0, kids:0, gold:0}
      if (days.length > 0) {
        this.sumCount = days.filter((day: DayWork) => (day.id = this.currentDayId))[0].sellCount;
      }
      console.log(this.sumCount);
    });
  }

  ngOnInit(): void {}

  private addSellCounts(sellCount1: SellCount, sellCount2: SellCount){
    var sellCount:SellCount={
      platinum : sellCount1.platinum + sellCount2.platinum,
      gold : sellCount1.gold + sellCount2.gold,
      kids:sellCount1.kids + sellCount2.kids,
    }
    return sellCount
  }
}


