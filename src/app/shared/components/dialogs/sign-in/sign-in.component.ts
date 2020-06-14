import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../dialog.service';

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
    public dialogService: DialogService
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

  onSignUp() {
    this.dialogService.signUp();
  }

}

