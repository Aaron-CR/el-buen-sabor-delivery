import { ArticuloManufacturado } from './../../core/models/articulos/articulo-manufacturado';
import { ArticuloInsumo } from './../../core/models/articulos/articulo-insumo';
import { SupplyService } from './../../shared/services/supply.service';
import { ManufacturedService } from './../../shared/services/manufactured.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public drinks: any;
  public index: number;
  public category: string;
  public filteredManufactured: ArticuloManufacturado[] = [];
  public manufactured: ArticuloManufacturado[] = [];
  public allProducts: object[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private manufacturedService: ManufacturedService,
    private supplyService: SupplyService
  ) { }


  ngOnInit(): void {
    this.findAllManufactured();
    this.findAllDrinks();
    this.getSelectedCategory();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog(item: object) {
    this.dialog.open(DialogComponent, {
      panelClass: 'app-dialog',
      width: '90%',
      maxWidth: '900px',
      data: item
    });
  }

  findAllManufactured() {
    this.subscription.add(this.manufacturedService.findAllUnpaged().subscribe(data => {
      this.manufactured = data;
      this.filterManufactured();
    }));
  }

  findAllDrinks() {
    this.subscription.add(this.supplyService.getBebidas()
      .subscribe(data => this.drinks = data));
  }

  getSelectedCategory() {
    this.subscription.add(this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filterManufactured();
    }));
  }

  filterManufactured() {
    this.filteredManufactured = this.manufactured.filter((article) => {
      if (!!this.category) {
        return article.categoria.denominacion.toLowerCase() === this.category.toLowerCase();
      }
      return this.manufactured;
    });
  }

}
