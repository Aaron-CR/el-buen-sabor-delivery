import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Subscription, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ArticuloManufacturado } from 'src/app/core/models/articulos/articulo-manufacturado';
import { ArticuloInsumo } from 'src/app/core/models/articulos/articulo-insumo';
import { ManufacturedService } from 'src/app/shared/services/manufactured.service';
import { SupplyService } from 'src/app/shared/services/supply.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public category: string;
  public articles: any[] = [];
  public filteredArticles: any[] = [];
  public manufactured: ArticuloManufacturado[] = [];
  public supplies: ArticuloInsumo[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private manufacturedService: ManufacturedService,
    private supplyService: SupplyService
  ) { }

  ngOnInit(): void {
    this.getArticles();
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

  getArticles() {
    forkJoin([this.manufacturedService.getAllPublic(), this.supplyService.getAllPublic()])
      .subscribe(data => {
        this.manufactured = data[0];
        this.supplies = data[1];
        this.articles = [...data[0], ...data[1]];
        this.getSelectedCategory();
      });
  }

  getSelectedCategory() {
    this.subscription.add(this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filterArticles();
    }));
  }

  filterArticles() {
    if (this.category === 'bebidas') {
      this.filteredArticles = this.supplies;
    } else if (!!this.category) {
      this.filteredArticles = this.manufactured.filter((article) =>
        article.categoria.denominacion.toLowerCase() === this.category);
    } else {
      this.filteredArticles = this.articles;
    }
  }

}
