import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private _jwtHelper:JwtHelperService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(sessionStorage.removeItem('rolename'));
      // if ((sessionStorage.getItem('rolename')==null|| sessionStorage.getItem('rolename')=="") ||((sessionStorage.getItem('email')==null)||sessionStorage.getItem('email')=="")) 
      // {
      //   Swal.fire({
      //     title:"Need to login",
      //     icon:"warning",
      //     showConfirmButton:true,
      //     confirmButtonText:"continue",
      //     timer:7000
      //   }).then((result)=>{
      //     this.router.navigate(['login']);
      //   })
      //   return false;
      // }
      const token=localStorage.getItem("jwt");
      const decodedToken = this._jwtHelper.decodeToken(token);
      const isRemember=localStorage.getItem("isrembember");
      console.log(isRemember);
      if (isRemember=="true") {
        console.log("setting token")
        if (token && !this._jwtHelper.isTokenExpired(token)) {
          //localStorage.setItem('jwt',token);
          localStorage.setItem('email',btoa(decodedToken.email)); 
          localStorage.setItem('role',btoa(decodedToken.role));
          return true;
        }
      }
      else
      {
        console.log("inside else")
        if ((sessionStorage.getItem('role')!=null || sessionStorage.getItem('role')!="") && !this._jwtHelper.isTokenExpired(token)) {
          console.log(sessionStorage.getItem('role'))
          console.log("setting session")
          //this.router.navigate(['login']);
          return true;
          }
      }
     
      // if (sessionStorage.getItem('rolename')==null || sessionStorage.getItem('rolename')=="") {
      //   this.router.navigate(['login']);
      //   return false;
      // }
      // else
      // {
      //   sessionStorage.setItem('email',decodedToken.email)
      //   sessionStorage.setItem('role',decodedToken.role)
      //   return true;
      // }
      this.router.navigate(['login']);
    return false;
  }
  
}
