import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ManufacturedService } from 'src/app/shared/services/manufactured.service';
import { SupplyService } from 'src/app/shared/services/supply.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private articlesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private lengthSubject = new BehaviorSubject<number>(null);
  public articles$ = this.articlesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();
  public searchQuery: string;

  get resultado() {
    return this.lengthSubject.value === 1 ? 'resultado' : 'resultados';
  }

  constructor(
    private manufacturedService: ManufacturedService,
    private supplyService: SupplyService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getSearchQuery();
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

  getSearchQuery() {
    this.subscription.add(this.route.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('search_query');
      this.getArticles();
    }));
  }

  getArticles() {
    this.subscription.add(forkJoin([
      this.manufacturedService.getAllPublic(this.searchQuery),
      this.supplyService.getAllPublic(this.searchQuery)
    ]).pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(data => {
        this.articlesSubject.next([...data[0], ...data[1]]);
        this.lengthSubject.next(this.articlesSubject.value.length);
      }));
  }

}
