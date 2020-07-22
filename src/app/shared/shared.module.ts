
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { AgmCoreModule } from '@agm/core';

import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpComponent } from './components/dialogs/sign-up/sign-up.component';
import { SignInComponent } from './components/dialogs/sign-in/sign-in.component';
import { FormAddressComponent } from './components/dialogs/form-address/form-address.component';
import { SelectAddressComponent } from './components/dialogs/select-address/select-address.component';
import { BaseComponent } from './components/dialogs/base/base.component';
import { ScheduleComponent } from './components/dialogs/schedule/schedule.component';
import { BillingDetailsComponent } from './components/dialogs/billing-details/billing-details.component';
import { ForgotPasswordComponent } from './components/dialogs/forgot-password/forgot-password.component';

import { DialogService } from './components/dialogs/dialog.service';

/* FIREBASE */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../../environments/environment';


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
    BillingDetailsComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    ShoppingCartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARaDrtQwfk6Ql8byHHSJtAAJGswf9ueds',
      libraries: ['places']
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig)
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
    DialogService,
    AngularFireAuth
  ]
})
export class SharedModule { }
