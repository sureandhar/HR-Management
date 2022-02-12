import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegistrationService } from 'src/app/Dhrms-Services/RegistrationService/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  constructor(
    private _registrationService: RegistrationService,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle('Dhrms-Update password');
  }

  ngOnInit(): void {}
  update(email: string, tpass: string, npass: string) {
    console.log(email);
    console.log(tpass);
    console.log(npass);
    if (email != '' && tpass != '' && npass != '') {
      this._registrationService.UpdatePassword(email, tpass, npass).subscribe(
        (response) => {
          console.log(response);
          if (response == 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Password updated',
              showConfirmButton: true,
              timerProgressBar: true,
              timer: 4000,
            }).then((element) => {
              if (element.isConfirmed || element.isDismissed) {
                this.router.navigate(['Login']);
              }
            });
          } else {
            // alert(response);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response,
              showConfirmButton: true,
              timer: 4000,
            }).then((element) => {
              if (element.isConfirmed || element.isDismissed) {
                //location.reload();
              }
            });
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: 'Failed to Update',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'continue',
            timer: 7000,
            timerProgressBar: true,
          });
        },
        () => {
          console.log('UpdatePassword executed');
        }
      );
    } else {
      console.log('enter values');
      alert('enter values');
    }
  }
}
