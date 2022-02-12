import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/Dhrms-Services/RegistrationService/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _registrationService:RegistrationService) { }

  ngOnInit(): void {
  }

  doLogout(event:any)
  {
    console.log("inside method")
    Swal.fire({
      title: 'Log out',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Log out',
      showCancelButton:true,
      text:"You will be returned to login screen.",
      timer: 8000,
      timerProgressBar: true,
    }).then((element) => {
      console.log(element)
      if (element.isConfirmed) {
        this._registrationService.logout();
        Swal.fire({
          title: 'Success',
          text: 'Successfully logged out',
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
        }).then((element)=>{
          if (element.isConfirmed || element.isDismissed) {
            location.reload();
          }
        })
        
      }
        else
        {
          event.stopPropagation();
        }
        
      
    })
    
  }

}


