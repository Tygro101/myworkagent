import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkTimeComponent } from '../../components/work-time/work-time'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(WorkTimeComponent) timeComponent: WorkTimeComponent;
  private inWork:boolean;
  private startButtonName:string;
  private startButtonColor:string;
  constructor(public navCtrl: NavController) {
    this.inWork = false;
    this.startButtonName = "Start";
    this.startButtonColor = "#007ac1";
  }

  toggleButtonName():void{
    this.startButtonName = this.startButtonName == "Stop"?"Start":"Stop";
    this.startButtonColor = this.startButtonColor == "#007ac1"?"#c50e29":"#007ac1";
    this.inWork = !this.inWork;
    this.timeComponent.start(this.inWork);
  }
}
