import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpFormGroup: FormGroup;
  public hide = true;

  constructor(
    public formBuilder: FormBuilder,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signUpFormGroup = this.formBuilder.group({
      displayName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignIn() {
    this.dialogService.signIn();
  }

}
