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

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    FormAddressComponent,
    SelectAddressComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule

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
  ]
})
export class SharedModule { }
