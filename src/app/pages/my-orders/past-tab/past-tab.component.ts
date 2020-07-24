import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Orden } from 'src/app/core/models/comprobantes/orden';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-past-tab',
  templateUrl: './past-tab.component.html',
  styleUrls: ['./past-tab.component.scss']
})
export class PastTabComponent implements OnInit {

  private dataSubject = new BehaviorSubject<Orden[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public lengthSubject = new BehaviorSubject<number>(null);
  public data$ = this.dataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.orderService.getPastOrders(this.authService.uid)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((response) => {
        this.dataSubject.next(response);
        return this.lengthSubject.next(this.dataSubject.value.length);
      });
  }

}
