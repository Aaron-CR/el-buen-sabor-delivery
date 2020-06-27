import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPassForm: FormGroup;
  public hide = true;

  constructor(public formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  sendEmail(form: FormGroup){
    this.authService.resetPassword(form.value.email);
  }

}
