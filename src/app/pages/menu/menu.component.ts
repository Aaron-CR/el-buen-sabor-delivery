import { ArticuloManufacturado } from './../../core/models/articulos/articulo-manufacturado';
import { ArticuloInsumo } from './../../core/models/articulos/articulo-insumo';
import { SupplyService } from './../../shared/services/supply.service';
import { ManufacturedService } from './../../shared/services/manufactured.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public drinks: ArticuloInsumo[] = [];
  public manufactured: ArticuloManufacturado[] = [];
  public allProducts: object[] = [];

  constructor(public dialog: MatDialog, private manufacturedService: ManufacturedService, private supplyService: SupplyService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'app-dialog'
    });
  }

  findAllManufactured(){
  }

  findAllDrinks(){
  }
}
