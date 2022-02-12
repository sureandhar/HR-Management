import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  sharedData:any;
  saveData(vale:any)
  {
    this.sharedData=vale;
  }
  getData()
  {
    return this.sharedData;
  }
}
