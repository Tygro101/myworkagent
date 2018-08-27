import { Component, Input, OnInit } from "@angular/core";

/**
 * Generated class for the SellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "sell",
  templateUrl: "sell.html"
})
export class SellComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  count: number;
  public classAtt = "";

  constructor() {
  }

  ngOnInit(): void {
    switch (this.name) {
      case "ילדים":
        this.classAtt = "kids";
        break;
      case "פלטינום":
        this.classAtt = "plat";
        break;
      case "זהב":
        this.classAtt = "gold";
        break;
    }
  }
}
