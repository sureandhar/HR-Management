import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Iinterview } from "src/app/dhrms-Interface/Candidate";
import { environment } from "src/environments/environment.prod";
import { IInterviewer } from "../../dhrms-Interface/Interviewer";

@Injectable({
  providedIn: "root",
})
export class InterviewerService {
  _url: any;
  constructor(private http: HttpClient) {
    this._url = environment.API_URL;
  }

  AddInterviewer(interviewer: IInterviewer): Observable<any> {
    console.log(interviewer);
    return this.http
      .post<any>("" + this._url + "/api/dhrms/AddInterviewer", interviewer)
      .pipe(catchError(this.errorHandler));
  }
  AddInterviewFeedback(interviewerfeedbackObj: Iinterview): Observable<any> {
    console.log(interviewerfeedbackObj);
    return this.http
      .post<any>(
        "" + this._url + "/api/dhrms/addInterviewFeedback",
        interviewerfeedbackObj
      )
      .pipe(catchError(this.errorHandler));
  }
  GetAllInterviewerdetails(): Observable<any> {
    // console.log(interviewer);
    return this.http
      .get<any>("" + this._url + "/api/dhrms/GetAllInterViewerDetails")
      .pipe(catchError(this.errorHandler));
  }
  GetScheduledCandidates(id: string): Observable<any> {
    var param = "?id=" + id;
    return this.http
      .get<any>("" + this._url + "/api/dhrms/getScheduledCandidates" + param)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}
