import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICandidate } from 'src/app/dhrms-Interface/Candidate';
import { CandidateService } from 'src/app/Dhrms-Services/CandidateService/candidate.service';
import { SharedService } from 'src/app/Dhrms-Services/SharedService/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css'],
})
export class CandidateDetailsComponent implements OnInit {
  CandidateList: ICandidate[];
  // Pagination parameters.
  page = 1;
  count = 0;
  //initial number of records to display
  tableSize = 5;
  //predefined sizes for no of rows to display
  tableSizes = [5, 10, 15, 20];

  constructor(
    private _candidateService: CandidateService,
    private router: Router,
    private _shared: SharedService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Candidate');
  }

  ngOnInit(): void {
    this._candidateService.Getallcandidates().subscribe(
      (response) => {
        console.log(response);
        if (response.toString().toLowerCase().includes('no records found')) {
          this.CandidateList = null;
        } else {
          this.CandidateList = JSON.parse(response.toString());
          this.CandidateList.forEach((element) => {
            var skill: any[] = [];
            // console.log(element.Skillset +"+++++");
            if (element.Skillset == '') {
              // console.log("empty")
              element.skilllist = null;
            } else {
              skill = element.Skillset.split(',');
              // console.log(temp);
              element.skilllist = skill;
            }
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

  //end
}
