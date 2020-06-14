import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';

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
    public dialogRef: MatDialogRef<SignUpComponent>,
    public dialog: MatDialog
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

  signIn() {
    this.dialogRef.close();
    this.dialog.open(SignInComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
  }
}
