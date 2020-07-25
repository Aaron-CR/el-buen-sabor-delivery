import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';
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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

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
    if (form.value.newPassword !== form.value.confirmPassword) {
      this.snackBar.open('¡Las contraseñas deben coincidir!', 'OK', {
        panelClass: ['app-snackbar'],
        duration: 10000
      });
    } else {
      this.authService.confirmNewPassword(code, form.value.newPassword).then(() => {
        this.snackBar.open('Contraseña actualizada con éxito', 'OK', {
          panelClass: ['app-snackbar'],
          duration: 10000
        });
        this.router.navigate(['']);
      }, err => {
        this.snackBar.open('Ha ocurrido un error', 'OK', {
          panelClass: ['app-snackbar'],
          duration: 10000
        });
      });
    }
  }

}
