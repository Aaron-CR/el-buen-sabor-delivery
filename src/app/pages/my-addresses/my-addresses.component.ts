import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private customerService: CustomerService,
    private dialogService: DialogService,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.customerService.getDirecciones(this.authService.uid)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((response) => {
        this.dataSubject.next(response);
        return this.lengthSubject.next(this.dataSubject.value.length);
      });
  }

  onSubmit(object: any) {
    this.dialogService.formAddress(object)
      .afterClosed().subscribe(result => {
        if (result.event === 'Añadir') {
          this.create(result.data);
        } else if (result.event === 'Editar') {
          this.create(result.data);
        }
      });
  }

  create(object: any) {
    this.customerService.addDireccion(object, this.authService.uid).subscribe(() => {
      this.successMessage('Añadido! Se ha añadido correctamente.');
    });
  }

  update(object: any) {
    console.log(object.id, 'editado');
    /* this.customerService.update(object.id).subscribe(() => {
      this.successMessage('Actualizado! Se ha actualizado correctamente.');
    }); */
  }

  onDelete(object: number) {
    console.log(object, this.authService.uid);
    this.customerService.removeDireccion(object, this.authService.uid).subscribe(() => {
      this.successMessage('Eliminado! Se ha eliminado correctamente.');
    });
  }

  successMessage(text: string) {
    this.snackBar.open(text, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    this.loadPage();
  }

}
