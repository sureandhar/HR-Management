import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ICandidate, Iinterview } from 'src/app/dhrms-Interface/Candidate';
import { CandidateService } from 'src/app/Dhrms-Services/CandidateService/candidate.service';
import { SharedService } from 'src/app/Dhrms-Services/SharedService/shared.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css'],
})
export class CandidateInfoComponent implements OnInit {
  constructor(
    private _shared: SharedService,
    private router: Router,
    private _candidateService: CandidateService,
    private route: ActivatedRoute,
    private _location: Location,
    private titleService: Title
  ) {
    this.titleService.setTitle('Candidate info');
  }
  candidateId: string;
  candidateDetail: ICandidate;
  roundList: Iinterview[];
  ngOnInit(): void {
    this.candidateId = this.route.snapshot.params['id'];
    // this.email=this._shared.getData();
    // if (window.history && window.history.pushState)
    // {
    //   console.log(window.history.pushState);
    //   window.addEventListener('popstate', (e) => {
    //     alert('Back button was pressed.');
    //     // this._location.back();
    //     const { redirect } = window.history.state;
    //     console.log(redirect);
    //     this.router.navigateByUrl(redirect || '/');
    //   });
    // }
    this._candidateService
      .Getcandidate(this.candidateId)
      .subscribe((response) => {
        console.log(response);
        if (response.toString().toLowerCase().includes('no records found')) {
          this.candidateDetail = null;
        } else {
          this.candidateDetail = JSON.parse(response.toString());

          // if(this.candidateDetail.Skillset=="")
          // {
          //   this.candidateDetail.Skillset="No records";
          // }

          var skill: any[] = [];
          // console.log(element.Skillset +"+++++");
          if (this.candidateDetail.Skillset == '') {
            // console.log("empty")
            this.candidateDetail.skilllist = null;
          } else {
            skill = this.candidateDetail.Skillset.split(',');
            // console.log(temp);
            this.candidateDetail.skilllist = skill;
          }

          if (this.candidateDetail.Workexperiencedetails.length == 0) {
            this.candidateDetail.Workexperiencedetails = null;
          }

          console.log(this.candidateDetail.Workexperiencedetails);
          // this.ngOnInit();
        }
      });

    this._candidateService
      .getCandidateInterviewdetails(this.candidateId)
      .subscribe(
        (response) => {
          console.log(response);
          // this.roundList = response;
          this.roundList = JSON.parse(response.toString());
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('fetched round list');
        }
      );
    console.log(this.candidateId);
  }
}
