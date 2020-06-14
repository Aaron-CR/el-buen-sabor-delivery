import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';

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
    public dialogRef: MatDialogRef<SignInComponent>,
    public dialog: MatDialog
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

  signUp() {
    this.dialogRef.close();
    this.dialog.open(SignUpComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
  }


}

