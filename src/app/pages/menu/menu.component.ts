import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Subscription, forkJoin, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloManufacturado } from 'src/app/core/models/articulos/articulo-manufacturado';
import { ArticuloInsumo } from 'src/app/core/models/articulos/articulo-insumo';
import { ManufacturedService } from 'src/app/shared/services/manufactured.service';
import { SupplyService } from 'src/app/shared/services/supply.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private articlesSubject = new BehaviorSubject<any[]>([]);
  private filteredArticles = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private lengthSubject = new BehaviorSubject<number>(null);
  public filteredArticles$ = this.filteredArticles.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();
  public manufactured: ArticuloManufacturado[] = [];
  public supplies: ArticuloInsumo[] = [];
  public category: string;

  @ViewChild('input') input: ElementRef;

  constructor(
    private manufacturedService: ManufacturedService,
    private supplyService: SupplyService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getArticles() {
    this.subscription.add(forkJoin([this.manufacturedService.getAllPublic(), this.supplyService.getAllPublic()])
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(data => {
        this.manufactured = data[0];
        this.supplies = data[1];
        this.articlesSubject.next([...this.manufactured, ...this.supplies]);
        this.lengthSubject.next(this.articlesSubject.value.length);
        this.getSelectedCategory();
      }));
  }

  getSelectedCategory() {
    this.subscription.add(this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filterArticles();
    }));
  }

  filterArticles() {
    this.category === 'bebidas' ? this.filteredArticles.next(this.supplies) : (this.category)
      ? this.filteredArticles.next(this.manufactured.filter((article) =>
        article.categoria.denominacion.toLowerCase() === this.category))
      : this.filteredArticles.next(this.articlesSubject.value);
  }

  openDialog(item: object) {
    this.dialog.open(DialogComponent, {
      panelClass: 'app-dialog',
      width: '90%',
      maxWidth: '900px',
      data: item
    });
  }

  onSearch() {
    if (this.input.nativeElement.value) {
      this.router.navigate(['menu/results'], { queryParams: { search_query: this.input.nativeElement.value } });
    } else {
      this.snackBar.open('No ingresaste ninguna palabra', 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    }
  }

}
