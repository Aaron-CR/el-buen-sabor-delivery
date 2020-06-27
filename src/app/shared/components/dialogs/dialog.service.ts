import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormAddressComponent } from './form-address/form-address.component';
import { SelectAddressComponent } from './select-address/select-address.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  signUp() {
    this.matDialog.closeAll();
    this.matDialog.open(SignUpComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
  }

  signIn() {
    this.matDialog.closeAll();
    this.matDialog.open(SignInComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
  }

  formAddress(object: any): MatDialogRef<FormAddressComponent> {
    return this.matDialog.open(FormAddressComponent, {
      panelClass: 'app-dialog',
      data: object,
    });
  }

  selectAddress() {
    this.matDialog.open(SelectAddressComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
  }

  billingDetails() {
    this.matDialog.open(BillingDetailsComponent, {
      panelClass: 'app-dialog'
    });
  }
  schedule() {
    this.matDialog.open(ScheduleComponent, {
      panelClass: 'app-dialog',
      width: '420px'
    });
  }

  forgotPassword() {
    this.matDialog.open(ForgotPasswordComponent, {
      panelClass: 'app-dialog',
      width: '500px'
    });
  }

}
