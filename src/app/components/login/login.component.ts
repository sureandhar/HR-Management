import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { StateStoreService } from "src/app/Dhrms-Services/StateService/state-store.service";
import Swal from "sweetalert2";
import { RegistrationService } from "../../Dhrms-Services/RegistrationService/registration.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private _registrationservice: RegistrationService,
    private router: Router,
    private _flagstore: StateStoreService,
    private _jwtHelper: JwtHelperService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Dhrms-Login");
  }

  //Initialization
  RoleName: string = "";
  Errormsg: string = "";
  isRemember: boolean = true;
  isEnabled: boolean = false;
  ngOnInit(): void {
    const token = localStorage.getItem("jwt");
    const decodedToken = this._jwtHelper.decodeToken(token);
    const isRemember = localStorage.getItem("isrembember");
    console.log(isRemember);
    if (isRemember == "true") {
      if (token && !this._jwtHelper.isTokenExpired(token)) {
        //localStorage.setItem('jwt',token);
        localStorage.setItem("email", btoa(decodedToken.email));
        localStorage.setItem("role", btoa(decodedToken.role));
        this.router.navigate(["Home"]);
      }
    } else {
      console.log("inside else");
      if (
        sessionStorage.getItem("role") != null ||
        sessionStorage.getItem("role") != ""
      ) {
        console.log("login using session");
        this.router.navigate(["Home"]);
      } else {
        this.router.navigate(["login"]);
      }
    }
  }
  validateLogin(form: NgForm): void {
    console.log(form.value.Email);
    console.log(form.value.Password);
    console.log(form.value.remember);

    //not implemented
    if (form.value.remember != "" || form.value.remember) {
      this.isRemember = true;
      localStorage.setItem("isrembember", "true");
    } else {
      localStorage.setItem("isrembember", "false");
      this.isRemember = false;
    }
    console.log(this.isRemember);

    if (form.value.Password == "" || form.value.Email == "") {
      Swal.fire({
        text: "Please enter username and password",
        icon: "warning",
        showConfirmButton: true,
        // text:"Try again after sometime",
        confirmButtonText: "Ok",
        width: 300,
        timer: 7000,
        timerProgressBar: true,
      });
    } else {
      this.isEnabled = true;
      this._registrationservice
        .login(form.value.Email, form.value.Password)
        .subscribe(
          (response) => {
            // this.RoleName=response==null?"none":response;
            console.log(response);
            const token = (<any>response).token;
            localStorage.setItem("jwt", token);
            // const decodedToken = this._jwtHelper.decodeToken(token);
            // this.RoleName=decodedToken.role;
            // console.log(decodedToken);
            // console.log(this.RoleName);
            this.RoleName = this._registrationservice.setUserdetails();
            console.log(this.RoleName);
            if (this.RoleName.toLowerCase() == "candidate") {
              // sessionStorage.setItem('rolename',this.RoleName);
              // sessionStorage.setItem('email',form.value.Email);
            } else if (this.RoleName.toLowerCase() == "interviewer") {
              // sessionStorage.setItem('rolename',this.RoleName);
              // sessionStorage.setItem('email',form.value.Email);
              this._flagstore.setFlag("showInterviewerDashboard", true);
              this.router.navigate(["Home"]);
            } else if (this.RoleName.toLowerCase() == "hr") {
              console.log("inside hr");
              // sessionStorage.setItem('rolename',this.RoleName);
              // sessionStorage.setItem('email',form.value.Email);
              this._flagstore.setFlag("showDashboard", true);
              this.router.navigate(["Home"]);
            } else {
              this.isEnabled = false;
              console.log("Invalid Username or Password");
              // alert("Invalid Username or Password");
              Swal.fire({
                title: "Invalid Username or Password",
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "continue",
                timer: 7000,
                timerProgressBar: true,
              });
            }
          },
          (errorReponse) => {
            this.Errormsg = errorReponse.error;
            if (this.Errormsg.toString().includes("ProgressEvent")) {
              this.Errormsg = "Server error";
              this.isEnabled = false;
            }
            this.isEnabled = false;
            console.log(errorReponse);
            Swal.fire({
              title: "Something went wrong",
              icon: "warning",
              showConfirmButton: true,
              text: this.Errormsg,
              confirmButtonText: "Ok",
              timer: 7000,
              timerProgressBar: true,
            });
          },
          () => {
            console.log("validateCredentials Method Executed");
          }
        );
    }
  }
}
