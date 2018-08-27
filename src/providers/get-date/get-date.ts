import { Injectable } from '@angular/core';


@Injectable()
export class GetDateProvider {

  constructor() {
   
  }

  public getNewDate():Date{
    var date = new Date();
    //date.setMonth(date.getMonth()+ 2);
    //date.setDate(date.getDate()+1);
    return date;
  }
}
