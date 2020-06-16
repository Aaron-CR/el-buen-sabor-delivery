import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './components/dialogs/sign-up/sign-up.component';
import { SignInComponent } from './components/dialogs/sign-in/sign-in.component';
import { FormAddressComponent } from './components/dialogs/form-address/form-address.component';
import { SelectAddressComponent } from './components/dialogs/select-address/select-address.component';
import { BaseComponent } from './components/dialogs/base/base.component';
import { DialogService } from './components/dialogs/dialog.service';
import { AgmCoreModule } from '@agm/core';
import { ScheduleComponent } from './components/dialogs/schedule/schedule.component';
import { BillingDetailsComponent } from './components/dialogs/billing-details/billing-details.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    FormAddressComponent,
    SelectAddressComponent,
    BaseComponent,
    ScheduleComponent,
    BillingDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARaDrtQwfk6Ql8byHHSJtAAJGswf9ueds',
      libraries: ['places']
    })
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NavigationComponent,
    SignUpComponent,
    SignInComponent,
    FormAddressComponent,
    SelectAddressComponent
  ],
  providers: [
    DialogService
  ]
})
export class SharedModule { }
