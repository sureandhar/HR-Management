import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ICandidate, Iinterview } from 'src/app/dhrms-Interface/Candidate';
import { InterviewerService } from 'src/app/Dhrms-Services/InterviewerService/interviewer.service';
import { RegistrationService } from 'src/app/Dhrms-Services/RegistrationService/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interviewer-feedback',
  templateUrl: './interviewer-feedback.component.html',
  styleUrls: ['./interviewer-feedback.component.css'],
})
export class InterviewerFeedbackComponent implements OnInit {
  candidateId: any;
  interviewerId: any;
  interviewId: number;
  statusList: any;
  CandidateList: ICandidate[];
  roundName: string;
  constructor(
    private route: ActivatedRoute,
    private _interviewerService: InterviewerService,
    private _registrationService: RegistrationService,
    private titleService: Title,
    private router:Router
  ) {
    this.titleService.setTitle('Interviewer feedback');
  }

  ngOnInit(): void {
    try {
      console.log(
        this.route.snapshot.params['id'],
        ' ',
        this.route.snapshot.params['interviewerid']
      );

      var _id = this.route.snapshot.params['id'];
      var _interviewerid = this.route.snapshot.params['interviewerid'];
      var _interviewid = this.route.snapshot.params['interviewid'];
      this.setDetail(_id, _interviewerid,_interviewid);
      //this.setRoundname();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        timer: 5000,
        timerProgressBar: true,
      });
    }
  }

  setDetail(_id: any, _interviewerid: any,_interviewid:any) {
    //decoding encrypted value from the route
    this.candidateId = atob(_id);
    console.log(this.candidateId);
    this.interviewerId = atob(_interviewerid);
    this.interviewId=parseInt(atob(_interviewid));
    this.statusList = ['Cleared', 'Failed', 'Other'];
    this.getcandidateList();
    //this.setRoundname();
  }

  getcandidateList() {
    if (this.interviewerId != null && this.interviewerId != '') {
      this._interviewerService
        .GetScheduledCandidates(this.interviewerId)
        .subscribe(
          (response) => {
            console.log(response);
            if (
              response.toString().toLowerCase().includes('no records found')
            ) {
              this.CandidateList = null;
            } else {
              this.CandidateList = JSON.parse(response.toString());

              // console.log(_interviewList);
              this.CandidateList.forEach((element) => {
                var skill: any[] = [];
                //manually unboxing object
                var _interviewList: any = element.Interviewdetails;
                console.log(_interviewList);
                if (_interviewList != null) {
                  console.log(_interviewList[0].Roundname);
                  element.Roundname = _interviewList[0].Roundname;
                  this.roundName = _interviewList[0].Roundname;
                  element.Status = _interviewList[0].Status;
                  //assign round value
                  if (
                    element.Candidateid == this.candidateId &&
                    element.Candidateid == this.interviewerId 
                  ) {
                    
                    console.log(this.roundName);
                  }
                  // element.Scheduledtime = this.timeConvertTo24(
                  //   _interviewList[0].Scheduledtime
                  // );
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

  addInterviewfeedback(form: NgForm) {
    var interviewObj: Iinterview;

    console.log(this.roundName);
    interviewObj = {
      Attended: 'Yes',
      Interviewerfeedback: form.value.feedback,
      Interviewername: '',
      Intervievwerid: parseInt(this.interviewerId),
      Candidateid: parseInt(this.candidateId),
      Status: this.roundName + ' ' + form.value.status,
      Roundname: '',
      Scheduleddate: new Date(),
      Scheduledtime: '',
      Interviewid:this.interviewId
    };
    this._interviewerService.AddInterviewFeedback(interviewObj).subscribe(
      (response) => {
        if (response == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Feedback has been saved',
            showConfirmButton: true,
            timerProgressBar: true,
            timer: 4000,
          }).then(element=>{
            if (element.isConfirmed || element.isDismissed) {
              this.router.navigate(['Home']);
            }
          })
        } else {
          // alert(response);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response,
            showConfirmButton: true,
          timer: 4000,
          }).then(element=>{
            if (element.isConfirmed || element.isDismissed) {
              location.reload();
            }
          })
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('add interviewe feedback executed');
      }
    );
    console.log(interviewObj);
  }

  //end
}
