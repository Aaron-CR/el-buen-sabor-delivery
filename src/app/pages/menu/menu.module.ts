import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [MenuComponent, CardComponent, DialogComponent, CategoriesComponent, ResultsComponent],
  imports: [
    CommonModule,
    CarouselModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
