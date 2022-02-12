import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ICandidate, Iinterview} from '../../dhrms-Interface/Candidate'

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http:HttpClient,private router:Router) { }

  AddCandidate(candidate:ICandidate,skill:any,education:any,experience:any):Observable<any>{
    console.log(experience);
    var candidateObj={
      'candidatedetail':candidate,
      'skill':skill,
      'education':education,
      'experience':experience
    }

    return this.http.post<any>('https://localhost:44358/api/dhrms/AddCandidate',candidateObj).pipe(catchError(this.errorHandler));
  }

  Getallcandidates():Observable<ICandidate[]>{
    // console.log(userObj);
    return this.http.get<ICandidate[]>('https://localhost:44358/api/dhrms/GetAllCandates').pipe(catchError(this.errorHandler));
  }
  Scheduleinterview(obj:Iinterview):Observable<any>{
    // console.log(userObj);
    return this.http.post<any>('https://localhost:44358/api/dhrms/Scheduleinterview',obj).pipe(catchError(this.errorHandler));
  }
  Getcandidate(id:string):Observable<ICandidate>{
    // console.log(userObj);
    //atob() used to decrypt/decode the ecrypted data
    try {
      var param="?id="+atob(id);
    } catch (error) {
      // console.log("exception occured");
      // console.log(error);
      this.router.navigate(['/404'])
    }
    

    return this.http.get<ICandidate>('https://localhost:44358/api/dhrms/GetCandidate'+param).pipe(catchError(this.errorHandler));
  }
  getCandidateInterviewdetails(id:string):Observable<any>{
    console.log(id);
    //atob() used to decrypt/decode the ecrypted data
    try {
      var param="?candidateId="+atob(id);
    } catch (error) {
      // console.log("exception occured");
      // console.log(error);
      this.router.navigate(['/404'])
    }
    

    return this.http.get<ICandidate>('https://localhost:44358/api/dhrms/getCandidateInterviewdetails'+param).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse)
  {
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}
