
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

/* FIREBASE */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../../environments/environment';
import { BasicNavigationComponent } from './components/basic-navigation/basic-navigation.component';
import { ForgotPasswordComponent } from './components/dialogs/forgot-password/forgot-password.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ItemCardComponent } from './components/shopping-cart/item-card/item-card.component';

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
    BasicNavigationComponent,
    ForgotPasswordComponent,
    ShoppingCartComponent,
    ItemCardComponent
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
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NavigationComponent,
    BasicNavigationComponent,
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
