import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { from, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Iuser } from "../../dhrms-Interface/User";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  _url: any;
  constructor(private http: HttpClient, private _jwtHelper: JwtHelperService) {
    //this._url = process.env.prod_url || '';
  }

  setUserdetails() {
    var _rolename = "";
    const token = localStorage.getItem("jwt");
    const decodedToken = this._jwtHelper.decodeToken(token);
    const isRemember = localStorage.getItem("isrembember");
    if (isRemember == "true") {
      console.log("inside local");
      if (token && !this._jwtHelper.isTokenExpired(token)) {
        console.log("setting token1");
        //localStorage.setItem('jwt',token);
        localStorage.setItem("email", btoa(decodedToken.email));
        localStorage.setItem("role", btoa(decodedToken.role));
        _rolename = decodedToken.role;
      }
    } else {
      console.log("setting session1");
      sessionStorage.setItem("email", btoa(decodedToken.email));
      sessionStorage.setItem("role", btoa(decodedToken.role));
      _rolename = decodedToken.role;
    }
    return _rolename;
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("isrembember");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
  }
  getUserdetails(key: string) {
    var _rolename = "";
    var _email = "";
    var _return = "";
    const token = localStorage.getItem("jwt");
    const decodedToken = this._jwtHelper.decodeToken(token);
    const isRemember = localStorage.getItem("isrembember");
    if (isRemember) {
      if (token && !this._jwtHelper.isTokenExpired(token)) {
        //localStorage.setItem('jwt',token);
        //localStorage.setItem('email', btoa(decodedToken.email));
        //localStorage.setItem('role', btoa(decodedToken.role));
        _rolename = decodedToken.role;
        _email = decodedToken.email;
      }
    } else {
      //sessionStorage.setItem('email', btoa(decodedToken.email));
      //sessionStorage.setItem('role', btoa(decodedToken.role));
      _rolename = decodedToken.role;
      _email = decodedToken.email;
    }
    switch (key.toLocaleLowerCase()) {
      case "email":
        _return = _email;
        break;
      case "role":
        _return = _rolename;
        break;

      default:
        break;
    }
    return _return;
  }
  //without JWT for validating password
  validateCredentials(_email: string, _password: string): Observable<string> {
    var userObj: Iuser;
    userObj = { Email: _email, Userpassword: _password };
    console.log(userObj);
    return this.http
      .post<string>(
        "https://localhost:44358/api/dhrms/ValidateUserCredntials",
        userObj
      )
      .pipe(catchError(this.errorHandler));
  }

  //with JWT
  login(_email: string, _password: string): Observable<string> {
    var userObj: Iuser;
    console.log(this._url);
    userObj = { Email: _email, Userpassword: _password };
    console.log(userObj);
    return this.http
      .post<string>("https://localhost:44358/api/auth/login", userObj)
      .pipe(catchError(this.errorHandler));
  }

  UpdatePassword(
    _email: string,
    _temppass: string,
    _pass: string
  ): Observable<string> {
    const params = {
      Email: _email,
      TempPassword: _temppass,
      Password: _pass,
    };
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(params);
    return this.http
      .post<string>("https://localhost:44358/api/dhrms/Updatepassword", body, {
        headers: headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(_error: HttpErrorResponse) {
    console.log(_error);
    return throwError(_error);
  }
}
