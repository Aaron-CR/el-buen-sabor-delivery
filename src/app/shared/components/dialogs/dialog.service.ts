import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormAddressComponent } from './form-address/form-address.component';
import { SelectAddressComponent } from './select-address/select-address.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

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

  formAddress() {
    this.matDialog.open(FormAddressComponent, {
      panelClass: 'app-dialog'
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

}
