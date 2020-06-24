import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../dialog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public signInFormGroup: FormGroup;
  public hide = true;

  constructor(
    public formBuilder: FormBuilder,
    public dialogService: DialogService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signInFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignIn(signInFormGroup: FormGroup): void{
    this.authService.loginEmailUser(signInFormGroup.value.email, signInFormGroup.value.password)
    .then((res) => {
      this.onSignInRedirect();
    }).catch( err => {
      this.snackBar.open(err.message, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    });
  }

  /* Inicio de sesión con google */
  onGoogleSignIn(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onSignInRedirect();
    }).catch ( err => {
      this.snackBar.open(err.message, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    });
  }

  onSignUp() {
    this.dialogService.signUp();
  }

  onSignInRedirect(): void {
    this.router.navigate(['/menu']);
  }

}

