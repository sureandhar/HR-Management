import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ICandidate } from 'src/app/dhrms-Interface/Candidate';
import { CandidateService } from 'src/app/Dhrms-Services/CandidateService/candidate.service';
import { Icandidateexperience } from '../../dhrms-Interface/Experience';
import { Ieducation } from '../../dhrms-Interface/Education';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
declare var candidatescript: any;

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit {
  constructor(
    private _candidateService: CandidateService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Add candidate');
  }

  ngOnInit(): void {
    new candidatescript();
  }
  //Initialization
  permanentaddress_cpy: string;
  isReadonly: boolean;
  isChecked: boolean;
  experienceFlag: boolean = false;
  educationFlag: boolean = false;
  skillFlag: boolean = false;
  puccheckFlag: boolean = false;
  sslccheckFlag: boolean = true;
  pgcheckFlag: boolean = false;
  ugcheckFlag: boolean = false;
  diplomacheckFlag: boolean = false;
  ExperiencecheckFlag: boolean = false;
  dbsavedPath: string;

  educationNameList: any = {
    highereducation: {
      diploma: [
        'dInstitutionname',
        'dStreamname',
        'dPercentage',
        'dYearofpassing',
      ],
      ug: [
        'ugInstitutionname',
        'ugStreamname',
        'ugPercentage',
        'ugYearofpassing',
      ],
      pg: [
        'pgInstitutionname',
        'pgStreamname',
        'pgPercentage',
        'pgYearofpassing',
      ],
    },
    secondaryeducation: {
      sslc: ['sslcInstitutionname', 'sslcPercentage', 'sslcYearofpassing'],
      puc: ['pucInstitutionname', 'pucPercentage', 'pucYearofpassing'],
    },
  };

  //node number
  nodenumber = 1;
  //For cloning div
  @ViewChild('viewContainer', { read: ViewContainerRef })
  viewContainer: ViewContainerRef;
  @ViewChild('template') template: TemplateRef<any>;

  //to add candidate
  addcandidatedetails(form: NgForm) {
    console.log(form);
    // var datePipe = new DatePipe("en-US");
    // var dob = datePipe.transform(form.value.dob, 'dd/MM/yyyy');
    // var date = new Date(new DatePipe("en-US").transform(form.value.dob,'dd/MM/yyyy'))
    // var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    // var dob=new Date(date.getTime() - userTimezoneOffset);

    //To get the input values of the experience section

    var experienceValueList = new Array();

    if (this.ExperiencecheckFlag) {
      // console.log( document.getElementsByName('companyname'))
      for (let index = 0; index <= this.nodenumber; index++) {
        console.log(index);
        var _temparr: Icandidateexperience;
        var _companyname = '';
        var _years = '';
        var _months = '';
        var _domain = '';
        var _projects = '';
        if (index == 0) {
          _companyname = (
            document.getElementsByName('companyname')[0] as HTMLInputElement
          ).value;
          _years = (document.getElementsByName('years')[0] as HTMLInputElement)
            .value;
          _months = (
            document.getElementsByName('months')[0] as HTMLInputElement
          ).value;
          _domain = (
            document.getElementsByName('domain')[0] as HTMLInputElement
          ).value;
          _projects = (
            document.getElementsByName('projects')[0] as HTMLInputElement
          ).value;
          // console.log(_companyname)
          _temparr = {
            Companyname: _companyname,
            Noofyears: Number(_years),
            Noofmonths: Number(_months),
            Domainname: _domain,
            Project: _projects,
            Experienceid: 0,
          };
          // console.log(_temparr);
          experienceValueList.push(_temparr);
        } else {
          console.log(
            document.getElementsByClassName('experience' + index).length
          );
          if (
            document.getElementsByClassName('experience' + index).length >= 1
          ) {
            console.log('insed' + index);
            _companyname = (
              document.getElementsByName(
                'companyname' + index
              )[0] as HTMLInputElement
            ).value;
            _years = (
              document.getElementsByName('years' + index)[0] as HTMLInputElement
            ).value;
            _months = (
              document.getElementsByName(
                'months' + index
              )[0] as HTMLInputElement
            ).value;
            _domain = (
              document.getElementsByName(
                'domain' + index
              )[0] as HTMLInputElement
            ).value;
            _projects = (
              document.getElementsByName(
                'projects' + index
              )[0] as HTMLInputElement
            ).value;
            //  console.log(_companyname)
            _temparr = {
              Companyname: _companyname,
              Noofyears: Number(_years),
              Noofmonths: Number(_months),
              Domainname: _domain,
              Project: _projects,
              Experienceid: 0,
            };
            //  console.log(_temparr);
            experienceValueList.push(_temparr);
          }
        }
        console.log(experienceValueList);
      }
    }

    //To get the input values of the education section
    var educationValueList: { [name: string]: any } = {};
    //highereducation
    var _highereducationlist = this.educationNameList.highereducation;
    var _diploma = _highereducationlist.diploma;
    var _ug = _highereducationlist.ug;
    var _pg = _highereducationlist.pg;
    //to get diploma details from input fields
    if (this.diplomacheckFlag) {
      //work like the dictionary
      var diploma: { [name: string]: string } = {};
      _diploma.forEach((element: any) => {
        var key = String(element).substr(1);
        diploma[key] = (
          document.getElementsByName(
            String(element).toLowerCase()
          )[0] as HTMLInputElement
        ).value;
      });
      //adding extracted value to education list
      // educationValueList.push(diploma);
      educationValueList['diploma'] = diploma;
    }

    // console.log(diploma);
    //to get ug details from input fields
    if (this.ugcheckFlag) {
      var ug: { [name: string]: string } = {};
      _ug.forEach((element: any) => {
        var key = String(element).substr(2);
        console.log(String(element).toLowerCase());
        ug[key] = (
          document.getElementsByName(
            String(element).toLowerCase()
          )[0] as HTMLInputElement
        ).value;
        console.log(ug[key]);
      });
      // console.log(ug);
      //adding extracted value to education list
      // educationValueList.push(ug);
      educationValueList['ug'] = ug;
    }

    //to get pg details from input fields
    if (this.pgcheckFlag) {
      var pg: { [name: string]: string } = {};
      _pg.forEach((element: any) => {
        var key = String(element).substr(2);
        pg[key] = (
          document.getElementsByName(
            String(element).toLowerCase()
          )[0] as HTMLInputElement
        ).value;
      });
      // console.log(ug);
      //adding extracted value to education list
      // educationValueList.push(pg);
      educationValueList['pg'] = pg;
    }

    //highereducation
    var _secondaryeducationlist = this.educationNameList.secondaryeducation;
    var _sslc = _secondaryeducationlist.sslc;
    var _puc = _secondaryeducationlist.puc;

    //to get sslc details from input fields
    if (this.sslccheckFlag) {
      var sslc: { [name: string]: string } = {};
      _sslc.forEach((element: any) => {
        var key = String(element).substr(4);
        sslc[key] = (
          document.getElementsByName(
            String(element).toLowerCase()
          )[0] as HTMLInputElement
        ).value;
      });
      // console.log(ug);
      //adding extracted value to education list
      // educationValueList.push(sslc);
      educationValueList['sslc'] = sslc;
      console.log(sslc);
    }

    //to get sslc details from input fields
    if (this.puccheckFlag) {
      var puc: { [name: string]: string } = {};
      _puc.forEach((element: any) => {
        var key = String(element).substr(3);
        puc[key] = (
          document.getElementsByName(
            String(element).toLowerCase()
          )[0] as HTMLInputElement
        ).value;
      });
      // console.log(ug);
      //adding extracted value to education list
      // educationValueList.push(puc);
      educationValueList['puc'] = puc;
      console.log(puc);
    }

    var skillValueList: { [name: string]: string } = {};
    //to get the skill input fields
    var primarySkill = (
      document.getElementsByName('primaryskills')[0] as HTMLInputElement
    ).value;
    var secondarySkill = (
      document.getElementsByName('secondaryskills')[0] as HTMLInputElement
    ).value;
    skillValueList['Primaryskill'] = primarySkill;
    skillValueList['Secondaryskill'] = secondarySkill;

    var interviewerobj: ICandidate = {
      Firstname: form.value.fname,
      Lastname: form.value.lname,
      Email: form.value.email,
      Contactnumber: form.value.contactnumber,
      Currentaddress: form.value.currentaddress,
      Permanentaddress: form.value.permanentaddress,
      City: form.value.city,
      RoleId: 1,
      Gender: form.value.gender,
      skilllist: [],
      Candidateid: 0,
      Scheduleddate: null,
      Skillset: '',
      Userid: 0,
      Dateofbirth: form.value.dob,
      Workexperiencedetails: [],
      Status: '',
      Scheduledtime: '',
      Roundname: '',
      Interviewdetails: [],
      Interviewerid:''
    };
    console.log(primarySkill);
    console.log(secondarySkill);
    console.log(educationValueList);
    console.log(skillValueList);

    //Validation for empty or required fields

    console.log('inside validation');
    //sslc
    if (educationValueList.sslc != null && this.sslccheckFlag) {
      for (let value of Object.values(educationValueList.sslc)) {
        if (value == '') {
          this.educationFlag = true;
          console.log('inside validation enable');
        } else {
          this.educationFlag = false;
          console.log('inside validation disable');
        }
      }
    }
    console.log(typeof educationValueList.puc);
    //puc
    if (typeof educationValueList.puc != 'undefined' && this.puccheckFlag) {
      for (let value of Object.values(educationValueList.puc)) {
        if (value == '') {
          this.educationFlag = true;
        } else {
          this.educationFlag = false;
        }
      }
    }
    //dimploma
    if (
      typeof educationValueList.diploma != 'undefined' &&
      this.diplomacheckFlag
    ) {
      for (let value of Object.values(educationValueList.diploma)) {
        if (value == '') {
          this.educationFlag = true;
        } else {
          this.educationFlag = false;
        }
      }
    }
    //ug
    if (typeof educationValueList.ug != 'undefined' && this.ugcheckFlag) {
      for (let value of Object.values(educationValueList.ug)) {
        if (value == '') {
          this.educationFlag = true;
        } else {
          this.educationFlag = false;
        }
      }
    }
    //pg
    if (typeof educationValueList.pg != 'undefined' && this.pgcheckFlag) {
      for (let value of Object.values(educationValueList.pg)) {
        if (value == '') {
          this.educationFlag = true;
        } else {
          this.educationFlag = false;
        }
      }
    }

    //validation for experience section
    if (this.ExperiencecheckFlag) {
      experienceValueList.forEach((element) => {
        // console.log(element);
        if (typeof element != 'undefined' && element != null) {
          for (let value of Object.values(element)) {
            // console.log(value +" experienc");
            if (typeof value == 'number' && value < -1) {
              this.experienceFlag = true;
            } else {
              this.experienceFlag = false;
            }

            if (typeof value != 'number' && value == '') {
              this.experienceFlag = true;
              // console.log("inside experience "+value)
            } else {
              this.experienceFlag = false;
            }

            // console.log("inside validation enable");
          }
        }
        // else{
        //   this.experienceFlag=false;
        //   console.log("inside validation disable");
        // }
      });
    } else {
      this.experienceFlag = false;
    }

    //validation for skill section
    if (typeof primarySkill != 'undefined' && primarySkill == '') {
      this.skillFlag = true;
      // console.log("inside validation enable");
    } else {
      this.skillFlag = false;
      // console.log("inside validation disable");
    }

    console.log(
      'flag detilas' + this.skillFlag + this.experienceFlag + this.educationFlag
    );

    if (!this.skillFlag && !this.experienceFlag && !this.educationFlag) {
      console.log('adding details');
      this._candidateService
        .AddCandidate(
          interviewerobj,
          skillValueList,
          educationValueList,
          experienceValueList
        )
        .subscribe(
          (response) => {
            console.log(response);
            var message = '';
            if (response == '0') {
              message = 'success';
              Swal.fire({
                icon: 'success',
                text: 'candidate details saved successfully',
                showConfirmButton: true,
                timer: 4000,
              }).then((element) => {
                if (element.isConfirmed || element.isDismissed) {
                  location.reload();
                }
              });
            } else if (response == 1) {
              message = 'No changes were made Try again after somtime ';
              Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: message,
                showConfirmButton: true,
                timer: 4000,
              }).then((element) => {
                if (element.isConfirmed || element.isDismissed) {
                  location.reload();
                }
              });
            } else if (response == -1) {
              message = 'Entered email already exists';
              Swal.fire({
                icon: 'info',
                text: message,
                showConfirmButton: true,
                timer: 4000,
              });
            } else if (response == -2) {
              message = 'User creation failed Try again after somtime';
              Swal.fire({
                icon: 'error',
                text: message,
                showConfirmButton: true,
                timer: 4000,
              }).then((element) => {
                if (element.isConfirmed || element.isDismissed) {
                  location.reload();
                }
              });
            } else if (response == -3) {
              message = 'Failed to add Skills';
              Swal.fire({
                icon: 'error',
                text: message,
                showConfirmButton: true,
                timer: 4000,
              });
            } else if (response == -4) {
              message = 'Failed to add Experience';
              Swal.fire({
                icon: 'error',
                text: message,
                showConfirmButton: true,
                timer: 4000,
              }).then((element) => {
                if (element.isConfirmed || element.isDismissed) {
                  location.reload();
                }
              });
            } else if (response == -5) {
              message = 'Failed to add Education';
              Swal.fire({
                icon: 'error',
                text: message,
                showConfirmButton: true,
                timer: 4000,
              }).then((element) => {
                if (element.isConfirmed || element.isDismissed) {
                  location.reload();
                }
              });
            } else if (response == -99) {
              message = 'Something went wrong Try again after somtime';
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
                showConfirmButton: true,
                timer: 4000,
              }).then((element) => {
                if (element.isConfirmed || element.isDismissed) {
                  location.reload();
                }
              });
            }
          },
          (errorResponse) => {
            console.log(errorResponse);
          },
          () => {
            console.log('AddInterviewer method executed');
          }
        );
    }
  }

  //Methos to check check box enabled or disabled
  checkValue(event: any, keystring: string) {
    // console.log(event.currentTarget.checked);
    // console.log(keystring + "this is string" + this.isChecked);
    var _flag = event.currentTarget.checked;
    if (keystring == '') {
      alert('Current address should not empty');
      console.log('one');
      event.currentTarget.checked = false;
      // this.isChecked=false;
    } else {
      if (_flag && keystring != '') {
        this.permanentaddress_cpy = keystring;
        this.isReadonly = !this.isReadonly;
        this.isChecked = !this.isChecked;
        //  console.log("two");
      } else {
        this.permanentaddress_cpy = '';
        this.isReadonly = !this.isReadonly;
        event.currentTarget.checked = false;
        this.isChecked = false;
        // console.log("three");
      }
    }
  }

  //toggle between flag value based on the checkbox clicked
  radioCheck(Keyname: string) {
    // var _flag=event.currentTarget.checked;
    // console.log(Keyname);
    if (Keyname == 'puccheckbox') {
      this.puccheckFlag = !this.puccheckFlag;
    } else if (Keyname == 'sslccheckbox') {
      this.sslccheckFlag = !this.sslccheckFlag;
    } else if (Keyname == 'pgckeckbox') {
      this.pgcheckFlag = !this.pgcheckFlag;
      // console.log(this.pgcheckFlag);
    } else if (Keyname == 'ugckeckbox') {
      this.ugcheckFlag = !this.ugcheckFlag;
    } else if (Keyname == 'diplomackeckbox') {
      this.diplomacheckFlag = !this.diplomacheckFlag;
    } else if (Keyname == 'experienceckeckbox') {
      console.log(Keyname);
      this.ExperiencecheckFlag = !this.ExperiencecheckFlag;
      const collection = document.getElementsByClassName('experience')[0];
      const inputcollection = collection.getElementsByTagName('input');

      if (this.ExperiencecheckFlag) {
        //to set all the input fields readonly
        for (let i = 0; i < inputcollection.length; i++) {
          inputcollection[i].removeAttribute('readonly');
        }
        //to set button to disbled
        (
          document.getElementsByName('addexperience')[0] as HTMLButtonElement
        ).disabled = false;
      } else {
        for (let i = 0; i < inputcollection.length; i++) {
          inputcollection[i].readOnly = true;
        }
        (
          document.getElementsByName('addexperience')[0] as HTMLButtonElement
        ).disabled = true;
      }
    }
  }

  //This methos will clone the existing element
  addExperienceView() {
    const template = this.template.createEmbeddedView(null);
    //using this we can view the html elements
    // console.log(template);
    // console.log(template.rootNodes[0]);
    // console.log(template.rootNodes[1]);
    //converting rootnode into HTMLElement
    var _labelExp = template.rootNodes[0] as HTMLElement;
    var _parentElem = template.rootNodes[0];
    var _divOne = _parentElem.getElementsByTagName('div')[0];
    var _divTwo = _parentElem.getElementsByTagName('div')[6];
    // console.log(_parentElem.getElementsByTagName("input"));
    //setting dynamic value to header name
    _labelExp.getElementsByTagName('label')[0].innerHTML =
      _labelExp.getElementsByTagName('label')[0].innerHTML + this.nodenumber;
    //setting class name for the parent div
    _parentElem.className = _parentElem.className + this.nodenumber;
    //setting class name for the parent div remove
    var _removeBtn = _parentElem.getElementsByTagName('input')[5];
    _removeBtn.name = _removeBtn.name + this.nodenumber;
    _removeBtn.hidden = false;

    // console.log(_removeBtn);
    // console.log(_divOne.getElementsByTagName("p"));
    //unboxing divone
    var company = _divOne.getElementsByTagName('div')[0];
    var _yearsMonths = _divOne
      .getElementsByTagName('div')[1]
      .getElementsByTagName('div')[0];
    var years = _yearsMonths.getElementsByTagName('div')[0];
    var months = _yearsMonths.getElementsByTagName('div')[1];
    // console.log(years);
    // console.log(months);
    // console.log(company);
    //unboxing divtwo
    var domain = _divTwo.getElementsByTagName('div')[0];
    var projects = _divTwo.getElementsByTagName('div')[1];

    company.getElementsByTagName('input')[0].name =
      company.getElementsByTagName('input')[0].name + this.nodenumber;
    years.getElementsByTagName('input')[0].name =
      years.getElementsByTagName('input')[0].name + this.nodenumber;
    months.getElementsByTagName('input')[0].name =
      months.getElementsByTagName('input')[0].name + this.nodenumber;
    // console.log(company);
    // console.log(domain);

    domain.getElementsByTagName('input')[0].name =
      domain.getElementsByTagName('input')[0].name + this.nodenumber;
    // console.log(projects);
    projects.getElementsByTagName('input')[0].name =
      projects.getElementsByTagName('input')[0].name + this.nodenumber;

    this.viewContainer.insert(template);
    // console.log(this.viewContainer);
    //incrementing value to append with cloned elements
    this.nodenumber++;

    // node - 0 will contains label for experience
    // node - 0 div company name, no of years, months
    // node - 6 div domain,projects
  }

  //This method is to remove the cloned view
  removeExperienceView(keyvalue: string) {
    console.log(keyvalue);
    const elements = document.getElementsByClassName(keyvalue);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
      this.nodenumber--;
    }
  }

  //to store emitted value form the upload-file component
  setstorePath(event: any) {
    console.log(event);
    this.dbsavedPath = event;
  }
  //end
}
