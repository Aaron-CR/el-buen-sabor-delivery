import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Orden } from 'src/app/core/models/comprobantes/orden';
import { OrderService } from 'src/app/shared/services/order.service';
import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  private dataSubject = new BehaviorSubject<Orden[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public lengthSubject = new BehaviorSubject<number>(null);
  public data$ = this.dataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.findAllUnpaged()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((response) => {
        this.dataSubject.next(response);
        return this.lengthSubject.next(this.dataSubject.value.length);
      });
  }

}
