import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public editPasswordForm: FormGroup;
  public hideCurrentPassword = true;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onConfirm(form: FormGroup) {
    const code = this.activeRoute.snapshot.queryParams['oobCode'];
    if (form.value.newPassword !== form.value.confirmPassword){
      this.snackBar
      .open('¡Las contraseñas deben coincidir!', 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    } else {
      this.authService.confirmNewPassword(code, form.value.newPassword)
        .then(
          () => {
            this.snackBar
            .open('Contraseña actualizada con éxito', 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
            this.router.navigate(['']);
          },
          err => {
            this.snackBar
            .open('Ha ocurrido un error', 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
          }
        );
    }
  }

}
