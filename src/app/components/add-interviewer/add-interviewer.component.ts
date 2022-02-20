import { Component, OnInit } from "@angular/core";
import { NgForm, FormControl, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { IInterviewer } from "src/app/dhrms-Interface/Interviewer";
import Swal from "sweetalert2";
import { InterviewerService } from "../../Dhrms-Services/InterviewerService/interviewer.service";

@Component({
  selector: "app-add-interviewer",
  templateUrl: "./add-interviewer.component.html",
  styleUrls: ["./add-interviewer.component.css"],
})
export class AddInterviewerComponent implements OnInit {
  constructor(
    private _interviewerservice: InterviewerService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Add interviewer");
  }

  isEnabled: boolean = false;
  ngOnInit(): void {}

  addInterViewer(form: NgForm) {
    console.log(form.value.fname);
    this.isEnabled = true;
    var interviewerobj: IInterviewer = {
      firstname: form.value.fname,
      lastname: form.value.lname,
      email: form.value.email,
      jobrole: form.value.jobrole,
      unitname: form.value.unitname,
      primaryskills: form.value.primaryskills,
      contactnumber: form.value.contactnumber,
      roleid: 2,
      gender: form.value.gender,
      password: "",
      skilllist: [],
      intervievwerid: 0,
    };
    this._interviewerservice.AddInterviewer(interviewerobj).subscribe(
      (response) => {
        console.log(response);
        var message;
        if (response == "0") {
          message = "success";
          this.isEnabled = false;
          Swal.fire({
            icon: "success",
            text: "interviewer details saved successfully",
            showConfirmButton: true,
            timerProgressBar: true,
            timer: 4000,
          }).then((element) => {
            if (element.isConfirmed || element.isDismissed) {
              location.reload();
            }
          });
        } else if (response == 1) {
          this.isEnabled = false;
          message = "No changes were made Try again after somtime ";
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: message,
            showConfirmButton: true,
            timer: 4000,
          }).then((element) => {
            if (element.isConfirmed || element.isDismissed) {
              location.reload();
            }
          });
        } else if (response == -1) {
          this.isEnabled = false;
          message = "Entered email already exists";
          Swal.fire({
            icon: "info",
            text: message,
            showConfirmButton: true,
            timer: 4000,
          }).then((element) => {
            if (element.isConfirmed || element.isDismissed) {
              location.reload();
            }
          });
        } else if (response == -2) {
          this.isEnabled = false;
          message = "User creation failed Try again after somtime";
          Swal.fire({
            icon: "error",
            text: message,
            showConfirmButton: true,
            timer: 4000,
          }).then((element) => {
            if (element.isConfirmed || element.isDismissed) {
              location.reload();
            }
          });
        } else if (response == -99) {
          this.isEnabled = false;
          message = "Something went wrong Try again after somtime";
          Swal.fire({
            icon: "error",
            title: "Oops...",
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
        this.isEnabled = false;
        console.log(errorResponse);
      },
      () => {
        console.log("AddInterviewer method executed");
      }
    );
  }
}
