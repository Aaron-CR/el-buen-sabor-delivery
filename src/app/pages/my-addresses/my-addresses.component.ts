import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Direccion } from 'src/app/core/models/direccion/direccion';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { AddressService } from 'src/app/shared/services/address.service';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.scss']
})
export class MyAddressesComponent implements OnInit {

  private dataSubject = new BehaviorSubject<DireccionDelivery[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public lengthSubject = new BehaviorSubject<number>(null);
  public data$ = this.dataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(
    private addressService: AddressService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.addressService.findAllUnpaged()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((response) => {
        this.dataSubject.next(response);
        return this.lengthSubject.next(this.dataSubject.value.length);
      });
  }

  onFormAddress(object: any) {
    this.dialogService.formAddress(object);
  }

}
