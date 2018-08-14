import { Injectable } from '@angular/core';


@Injectable()
export class GetDateProvider {

  constructor() {
   
  }

  public getNewDate():Date{
    var date = new Date();
    //date.setDate(date.getDate()+ 1);
    return date;
  }
}
