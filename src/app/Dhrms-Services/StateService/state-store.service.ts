import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {Stateflag} from '../../dhrms-Interface/Home'

@Injectable({
  providedIn: 'root'
})

export class StateStoreService {

  constructor() { }
  private initialFlag: Stateflag = {
    showDashboard:false,
    showAddCandidate:false,
    showAddInterviewer:false,
    showAddInterviewerdetails:false,
    showcandidatedetail:false,
    showInterviewerDashboard:false
};
private flagTracker = new BehaviorSubject<Stateflag>(this.initialFlag);

getFlag(): Observable<any> {

      return this.flagTracker.asObservable();
      
//  if (flagname=="showDashboard")
// {
//     return this.flagTracker.value.showAddCandidate;
// }
// if (flagname=="showAddCandidate")
// {
//     return this.flagTracker.value.showAddCandidate;

// }
// if (flagname=="showAddInterviewer")
// {
//     return this.flagTracker.value.showAddInterviewer;

// }
// if (flagname=="showAddInterviewerdetails")
// {
//     return this.flagTracker.value.showAddInterviewerdetails;

// }
// if (flagname=="showcandidatedetail")
// {
//     return this.flagTracker.value.showcandidatedetail;

// }
// return false;

}
setFlag(flagname:string,flagvalue:boolean):void{
if (flagname=="showDashboard")
{
    this.flagTracker.next({showDashboard:flagvalue,showAddCandidate:false,showAddInterviewer:false,showAddInterviewerdetails:false,showInterviewerDashboard:false,showcandidatedetail:false})

}
if (flagname=="showAddCandidate")
{
    this.flagTracker.next({showDashboard:false,showAddCandidate:flagvalue,showAddInterviewer:false,showAddInterviewerdetails:false,showInterviewerDashboard:false,showcandidatedetail:false})

}
if (flagname=="showAddInterviewer")
{
    this.flagTracker.next({showDashboard:false,showAddCandidate:false,showAddInterviewer:flagvalue,showAddInterviewerdetails:false,showInterviewerDashboard:false,showcandidatedetail:false})

}
if (flagname=="showAddInterviewerdetails")
{
    this.flagTracker.next({showDashboard:false,showAddCandidate:false,showAddInterviewer:false,showAddInterviewerdetails:flagvalue,showInterviewerDashboard:false,showcandidatedetail:false})

}
if (flagname=="showcandidatedetail")
{
    this.flagTracker.next({showDashboard:false,showAddCandidate:false,showAddInterviewer:false,showAddInterviewerdetails:false,showInterviewerDashboard:false,showcandidatedetail:flagvalue})

}
if (flagname=="showInterviewerDashboard") {
  this.flagTracker.next({showDashboard:false,showAddCandidate:false,showAddInterviewer:false,showAddInterviewerdetails:false,showcandidatedetail:false,showInterviewerDashboard:flagvalue})

}
}
resetFlag():void{
this.flagTracker.next(this.initialFlag)

}
}
