import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewerService } from 'src/app/Dhrms-Services/InterviewerService/interviewer.service';
import { IInterviewer } from '../../dhrms-Interface/Interviewer';
import { Iinterview } from '../../dhrms-Interface/Candidate';
import { CandidateService } from 'src/app/Dhrms-Services/CandidateService/candidate.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css'],
})
export class ScheduleInterviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _interviewerService: InterviewerService,
    private _candidateService: CandidateService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Schedule Interview');
  }
  candidateId: string;
  interviewerList: IInterviewer[];
  roundList: any = ['Round-1', 'Round-2', 'Round-3', 'Final'];
  ngOnInit(): void {
    this.candidateId = atob(this.route.snapshot.params['id']);
    // console.log(this.candidateId);
    this._interviewerService.GetAllInterviewerdetails().subscribe(
      (response) => {
        console.log(response);
        if (response.toString().toLowerCase().includes('no records found')) {
          this.interviewerList = null;
        } else {
          this.interviewerList = response;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('getallinterviwerdetails executed');
      }
    );
  }

  addInterviewschedule(form: NgForm) {
    console.log(form.value);

    // {cid: '5', interviewerid: 3, date: '2022-01-20', time: '09:44'}
    var scheduleObj: Iinterview;
    scheduleObj = {
      Candidateid: form.value.cid,
      Intervievwerid: form.value.interviewerid,
      Scheduleddate: form.value.date,
      Scheduledtime: form.value.time,
      Status: form.value.roundname+" "+'scheduled',
      Attended: 'No',
      Interviewerfeedback: '',
      Roundname: form.value.roundname,
      Interviewername: '',
      Interviewid:0
    };
    console.log(scheduleObj);
    this._candidateService.Scheduleinterview(scheduleObj).subscribe(
      (response) => {
        console.log(response);
        if (response == 'success') {
          Swal.fire({
            icon: 'success',
            text: 'Interview scheduled scuccessfully',
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
        // alert(response);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Failed to schedule interview',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'continue',
          timer: 7000,
          timerProgressBar: true,
        }).then((element) => {
          if (element.isConfirmed) {
            this.router.navigate(['Home']);
          }
        });
      },
      () => {
        console.log('scheduleinter method exeuted');
      }
    );
  }

  //end
}
