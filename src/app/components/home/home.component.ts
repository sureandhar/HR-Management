import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { StateStoreService } from '../../Dhrms-Services/StateService/state-store.service';
import { Stateflag } from '../../dhrms-Interface/Home';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegistrationService } from 'src/app/Dhrms-Services/RegistrationService/registration.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showDashboard: boolean;
  showAddCandidate: boolean;
  showAddInterviewer: boolean;
  showAddInterviewerdetails: boolean;
  showcandidatedetail: boolean;
  showInterviewerDashboard: boolean;
  ComponentTitle: string = '';
  _flag: Stateflag;
  subscription: any;
  role: string;
  hrFlag: boolean = false;
  interviewerFlag: boolean = false;

  constructor(
    private _flagstore: StateStoreService,
    private _jwtHelper: JwtHelperService,
    private _registrationservice: RegistrationService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Home');
  }

  // isUserAuthenticated()
  // {
  //   const token=localStorage.getItem("jwt");
  //     if (token && !this._jwtHelper.isTokenExpired(token)) {
  //       console.log("token not expired")
  //       return true;
  //     }
  //     else
  //     {
  //       console.log("token not expired")
  //       return false;
  //     }
  // }

  ngOnInit(): void {
    //this.ComponentTitle="Candidates"

    console.log('inside ut');
    this.role = this._registrationservice.getUserdetails('role');
    console.log(this.role);
    if (
      this.role != null &&
      this.role != 'undefined' &&
      this.role.toLowerCase() == 'interviewer'
    ) {
      this.interviewerFlag = true;
      this.ComponentTitle = 'Interview scheduled';
      // this.showInterviewerDashboard=true;
      // this._flagstore.setFlag("showInterviewerDashboard",true);
    } else if (
      this.role != null &&
      this.role != 'undefined' &&
      this.role.toLowerCase() == 'hr'
    ) {
      // this.showDashboard=true;
      // this._flagstore.setFlag("showDashboard",true);
      this.ComponentTitle = 'Candidates';
      this.hrFlag = true;
    }
    this.getFlag();
  }

  changeComponent(keyvalue: string) {
    console.log(keyvalue);
    if (keyvalue == 'Add Candidate') {
      // this.showDashboard=false;
      // this.showAddCandidate=true;
      // this.showAddInterviewer=false;
      // this.showcandidatedetail=false;
      // this.showAddInterviewerdetails=false;
      this._flagstore.setFlag('showAddCandidate', true);
      this.getFlag();
      this.ComponentTitle = keyvalue;
    }
    if (keyvalue == 'Candidate Details') {
      // this.showDashboard=false;
      // this.showAddCandidate=false;
      // this.showAddInterviewer=false;
      // this.showcandidatedetail=true;
      // this.showAddInterviewerdetails=false;
      this._flagstore.setFlag('showcandidatedetail', true);
      this.getFlag();
      this.ComponentTitle = keyvalue;
    }
    if (keyvalue == 'Dashboard') {
      // this.showDashboard=true;
      // this.showAddCandidate=false;
      // this.showAddInterviewer=false;
      // this.showcandidatedetail=false;
      // this.showAddInterviewerdetails=false;
      if (this.interviewerFlag) {
        this._flagstore.setFlag('showInterviewerDashboard', true);
        this.ComponentTitle = 'Interview scheduled';
      }
      if (this.hrFlag) {
        this._flagstore.setFlag('showDashboard', true);
        this.ComponentTitle = 'Candidates';
      }
      this.getFlag();

      //this.ComponentTitle=keyvalue;
    }
    if (keyvalue == 'Add InterViewer') {
      // this.showDashboard=false;
      // this.showAddCandidate=false;
      // this.showAddInterviewer=true;
      // this.showcandidatedetail=false;
      // this.showAddInterviewerdetails=false;
      this._flagstore.setFlag('showAddInterviewer', true);
      this.getFlag();
      this.ComponentTitle = keyvalue;
    }
    if (keyvalue == 'InterViewer Details') {
      // this.showDashboard=false;
      // this.showAddCandidate=false;
      // this.showAddInterviewer=false;
      // this.showcandidatedetail=false;
      // this.showAddInterviewerdetails=true;
      this._flagstore.setFlag('showAddInterviewerdetails', true);
      this.getFlag();
      this.ComponentTitle = keyvalue;
    }
  }

  //to get update state of the flag using services
  getFlag() {
    this.subscription = this._flagstore.getFlag().subscribe(
      (res) => {
        console.log(res);
        this._flag = res;
        this.showDashboard = this._flag.showDashboard;
        this.showAddCandidate = this._flag.showAddCandidate;
        this.showAddInterviewer = this._flag.showAddInterviewer;
        this.showAddInterviewerdetails = this._flag.showAddInterviewerdetails;
        this.showcandidatedetail = this._flag.showcandidatedetail;

        if (
          !this.showDashboard &&
          !this.showAddCandidate &&
          !this.showAddInterviewer &&
          !this.showAddInterviewerdetails &&
          !this.showcandidatedetail
        ) {
          if (this.hrFlag) {
            this.showDashboard = true;
          }
          if (this.interviewerFlag) {
            this.showInterviewerDashboard = true;
          }
        }
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }
  //end
}
