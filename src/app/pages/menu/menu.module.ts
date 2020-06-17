import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [MenuComponent, CardComponent, DialogComponent, CategoriesComponent],
  imports: [
    CommonModule,
    CarouselModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
