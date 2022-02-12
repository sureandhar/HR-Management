import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IInterviewer } from 'src/app/dhrms-Interface/Interviewer';
import { InterviewerService } from '../../Dhrms-Services/InterviewerService/interviewer.service';
import { RegistrationService } from '../../Dhrms-Services/RegistrationService/registration.service';

@Component({
  selector: 'app-interviewerdetails',
  templateUrl: './interviewerdetails.component.html',
  styleUrls: ['./interviewerdetails.component.css'],
})
export class InterviewerdetailsComponent implements OnInit {
  constructor(
    private _interviewerservice: InterviewerService,
    private _registrationService: RegistrationService,
    private titleService: Title
  ) {
    this.EmailId = _registrationService.getUserdetails('email');
    this.titleService.setTitle('Interviewer');
  }
  InterviewerList: IInterviewer[];
  showInput: boolean = false;
  EmailId: string = '';
  RoleName: string = '';
  searchText = '';
  // Pagination parameters.
  page = 1;
  count = 0;
  //initial number of records to display
  tableSize = 5;
  //predefined sizes for no of rows to display
  tableSizes = [5, 10, 15, 20];
  // characters = [
  //   'Ant-Man',
  //   'Aquaman',
  //   'Asterix',
  //   'The Atom',
  //   'The Avengers',
  //   'Batgirl',
  //   'Batman',
  //   'Batwoman',

  // ];
  searchModel: string;
  ngOnInit(): void {
    this._interviewerservice.GetAllInterviewerdetails().subscribe(
      (repsonse) => {
        console.log(repsonse);
        if (repsonse.toString().toLowerCase().includes('no records found')) {
          this.InterviewerList = null;
        } else {
          this.InterviewerList = repsonse;
          this.InterviewerList.forEach((element) => {
            var skill: any[] = [];
            skill = element.primaryskills.split(',');
            // console.log(temp);
            element.skilllist = skill;
          });
        }

        console.log(this.InterviewerList);
      },
      (errorResponse) => {
        console.log(errorResponse);
      },
      () => {
        console.log('GetAllInterviewerdetails Executed');
      }
    );
  }

  showPassword(keyEvent: any) {
    console.log(keyEvent);
    // var parent = keyEvent.target.parentNode;
    // var sibling = keyEvent.target.parentNode.parentNode.nextSibling;
    // console.log(parent.id);
    // console.log(sibling);
    //  var _id=parent.id == null? "":parent.id;

    //Added "!" at the end to remove the undefined error while compilation
    var parentElement = window.document.getElementById(
      keyEvent.target.parentNode.id
    )!;
    var buttonElement = parentElement?.getElementsByTagName('button');
    var inputElement = parentElement?.getElementsByTagName('input');
    var pElement = parentElement?.getElementsByTagName('p');
    var progressElement = parentElement?.getElementsByTagName('div');

    if (parentElement != null) {
      // if(inputElement?.length!=0)
      // {

      let password = prompt('Retype your password', '');
      if (password == null || password == '') {
        alert('Password not Empty');
      } else {
        if (this.EmailId != null || this.EmailId != '') {
          console.log(this.EmailId);
          this._registrationService
            .validateCredentials(this.EmailId, password)
            .subscribe(
              (response) => {
                this.RoleName = response;
                console.log(response);
                if (this.RoleName.toLowerCase() == 'hr') {
                  buttonElement[0].style.display = 'none';
                  pElement[0].style.display = 'block';
                  progressElement[0].style.display = 'block';
                  //setting timer function to hide password after 60 second
                  setTimeout(() => {
                    buttonElement[0].style.display = 'block';
                    pElement[0].style.display = 'none';
                    progressElement[0].style.display = 'none';
                    clearInterval(timer);
                  }, 60000);
                  //setting timer for progressbar
                  var second = 60;
                  var totalSeconds=60000;
                  var timer = setInterval(function () {
                    console.log(totalSeconds);
                    console.log(Math.round((totalSeconds/6)/100));
                    progressElement[1].style.width = Math.round((totalSeconds/6)/100) + '%';
                    second--;
                    totalSeconds-=1000;
                    if (second == 0) {
                      clearInterval(timer);
                    }
                  }, 1000);
                } else {
                  alert('Incorrect password');
                }
              },
              (errorResponse) => {
                console.log(errorResponse);
              },
              () => {
                console.log('validateCredentials executed');
              }
            );
        }
      }

      // inputElement[0].style.display="block";
      // }
    }
    console.log(parentElement);
    console.log(inputElement);
    console.log(buttonElement);
    console.log(pElement);
  }

  search(key: string) {
    console.log(key);
    var t = this.transform(this.InterviewerList, key);
    // console.log(t);
    this.InterviewerList = t;
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

  transform(items: IInterviewer[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      // return it.toLocaleLowerCase().includes(searchText);
      // console.log(it);
      var name = it.firstname + it.lastname;
      if (name.includes(searchText)) {
        return it;
        // console.log(it);
      }
      return [];
    });
  }

  //end
}
