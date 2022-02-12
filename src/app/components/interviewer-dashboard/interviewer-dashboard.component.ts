import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICandidate, Iinterview } from 'src/app/dhrms-Interface/Candidate';
import { IInterviewer } from 'src/app/dhrms-Interface/Interviewer';
import { CandidateService } from 'src/app/Dhrms-Services/CandidateService/candidate.service';
import { InterviewerService } from 'src/app/Dhrms-Services/InterviewerService/interviewer.service';
import { RegistrationService } from 'src/app/Dhrms-Services/RegistrationService/registration.service';
import { SharedService } from 'src/app/Dhrms-Services/SharedService/shared.service';

@Component({
  selector: 'app-interviewer-dashboard',
  templateUrl: './interviewer-dashboard.component.html',
  styleUrls: ['./interviewer-dashboard.component.css'],
})
export class InterviewerDashboardComponent implements OnInit {
  constructor(
    private _interviewerService: InterviewerService,
    private _registrationService: RegistrationService,
    private router: Router,
    private _shared: SharedService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Interviewer dashboard');
  }
  CandidateList: ICandidate[];
  InterviewerList: IInterviewer[];
  InterviewerId: any;
  email: string;
  _index: number = 0;
  // Pagination parameters.
  page = 1;
  count = 0;
  //initial number of records to display
  tableSize = 5;
  //predefined sizes for no of rows to display
  tableSizes = [5, 10, 15, 20];

  ngOnInit(): void {
    this.email = this._registrationService.getUserdetails('email');
    console.log(this.email);
    this._interviewerService.GetAllInterviewerdetails().subscribe(
      (response) => {
        console.log(response);
        if (response.toString().toLowerCase().includes('no records found')) {
          this.InterviewerList = null;
        } else {
          this.InterviewerList = response;
          // console.log(response);
          //used .every intentional to break at some point
          console.log(this.email);
          this.InterviewerList.every((element) => {
            if (element.email.toLowerCase() == this.email.toLowerCase()) {
              this.InterviewerId = element.intervievwerid;
              this.getcandidateList();
              console.log('interviewer Id' + this.InterviewerId);
              return false;
            } else {
              this.InterviewerId = '';
              console.log('interviewer Id' + this.InterviewerId);
              return true;
            }
          });
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('fetched all interviewer list');
      }
    );
  }

  getcandidateList() {
    if (this.InterviewerId != null && this.InterviewerId != '') {
      this._interviewerService
        .GetScheduledCandidates(this.InterviewerId)
        .subscribe(
          (response) => {
            console.log(response);
            if (
              response.toString().toLowerCase().includes('no records found')
            ) {
              this.CandidateList = null;
            } else {
              this.CandidateList = JSON.parse(response.toString());
              this._index = 0;
              // console.log(_interviewList);
              this.CandidateList.forEach((element) => {
                var skill: any[] = [];
                //manually unboxing object
                var _interviewList: any[] = element.Interviewdetails;
                var length = _interviewList.length;

                console.log(_interviewList);
                if (_interviewList != null) {
                  console.log(_interviewList[this._index].Roundname);
                  element.Roundname = _interviewList[this._index].Roundname;
                  element.Status = _interviewList[this._index].Status;
                  element.Scheduleddate = _interviewList[this._index].Scheduleddate;
                  element.Interviewerid = _interviewList[this._index].Intervievwerid;
                  element.Scheduledtime = this.timeConvertTo24(
                    _interviewList[this._index].Scheduledtime
                  );
                  this._index++;
                } else {
                  element.Status = 'Not scheduled';
                }
                // console.log(element.Skillset +"+++++");
                if (element.Skillset == '') {
                  // console.log("empty")
                  element.skilllist = null;
                } else {
                  skill = element.Skillset.split(',');
                  // console.log(temp);
                  element.skilllist = skill;
                }
                // console.log(element.Scheduledtime)
                // element.Scheduledtime = this.timeConvertTo24(
                //   element.Scheduledtime
                // );
                console.log(element.Scheduledtime);
              });
              // this.tableSize=this.CandidateList.length;
              console.log(this.CandidateList);
            }
          },
          (errorResponse) => {
            console.log(errorResponse);
          },
          () => {
            console.log('Getallcandidates Executed');
          }
        );
    } else {
      console.log('no id found');
    }
  }

  timeConvertTo24(time: any) {
    try {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
    } catch (error) {
      console.log(error);
      return time;
    }

    return time.join(''); // return adjusted time or original string
  }

  navigate(value: any) {
    console.log(value);
    if (value != '' && value != 'undefined') {
      this._shared.saveData(value);
      //btoa() used to encrypt
      this.router.navigate(['/Candidateinfo', btoa(value)]);
    }
  }

  //move b/w one page to another
  onTableDataChange(event: any) {
    this.page = event;
  }

  //setting no of records to display
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  feedback(id: any, roundname: any,interviewid:any) {
    console.log(id);
    if (id != '' && id != 'undefined') {
      // this._shared.saveData(value);
      //btoa() used to encrypt
      console.log(this.InterviewerId);
      console.log(id);
      // sessionStorage.setItem('cid',btoa(id))
      // sessionStorage.setItem('iid',btoa(this.InterviewerId))
      this.router.navigate([
        '/interviewfeedback',
        btoa(id),
        btoa(interviewid),
        btoa(this.InterviewerId),
      ]);
    }
  }

  //end
}
