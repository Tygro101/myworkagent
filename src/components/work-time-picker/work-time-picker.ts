import { Component, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { WorkTime } from "../../store/state";
/**
 * Generated class for the WorkTimePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "work-time-picker",
  templateUrl: "work-time-picker.html"
})
export class WorkTimePickerComponent {
  public startTime: string;
  public endTime: string;
  @Output()
  endCall = new EventEmitter<WorkTime>();

  constructor() {}

  end() {
    if (!this.startTime || !this.endTime) {
      this.endCall.emit({hours:0, minutes:0, seconds:0});
    }
    var startDate = moment(this.startTime, "HH:mm:ss");
    var endDate = moment(this.endTime, "HH:mm:ss");
    var duration = moment.duration(moment(startDate).diff(endDate));
    this.endCall.emit({
      hours: Math.abs(duration.get("hours")),
      minutes: Math.abs(duration.get("minutes")),
      seconds: 0
    });
  }


}
