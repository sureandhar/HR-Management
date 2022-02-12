import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICandidate } from '../../dhrms-Interface/Candidate';
import { CandidateService } from '../../Dhrms-Services/CandidateService/candidate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  CandidateList: ICandidate[];
  // Pagination parameters.
  page = 1;
  count = 0;
  //initial number of records to display
  tableSize = 5;
  //predefined sizes for no of rows to display
  tableSizes = [5, 10, 15, 20];
  _test: true;
  constructor(
    private _candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // var _temp:ICandidate={FirstName:"first name",LastName:"Lastname",SkillSet:"nothing",ScheduledDate:new Date()}
    // this.CandidateList.push(_temp);
    // console.log(this.CandidateList);
    this._candidateService.Getallcandidates().subscribe(
      (repsonse) => {
        console.log(JSON.parse(repsonse.toString()));
        if (repsonse.toString().toLowerCase().includes('no records found')) {
          this.CandidateList = null;
        } else {
          //Json parse is used to preserve the same property name case
          this.CandidateList = JSON.parse(repsonse.toString());
          this.CandidateList.forEach((element) => {
            var skill: any[] = [];
            if (element.Skillset == '') {
              // console.log("empty")
              element.skilllist = null;
            } else {
              skill = element.Skillset.split(',');
              // console.log(temp);
              element.skilllist = skill;
            }
          });
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
    // console.log(_temp);
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

  schedule(id: any) {
    console.log(id);
    this.router.navigate(['Scheudle', btoa(id)]);
  }
  //end
}
