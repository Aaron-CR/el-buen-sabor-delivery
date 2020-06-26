import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Localidad } from 'src/app/core/models/direccion/localidad';
import { HttpClient } from '@angular/common/http';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss']
})
export class FormAddressComponent implements OnInit {

  public localData: DireccionDelivery;
  public action: string;
  public addressFormGroup: FormGroup;
  public localidades: Array<Localidad>;
  public latitude: number;
  public longitude: number;
  public zoom = 15;

  get address(): string {
    return `${this.addressFormGroup.get('calle').value ? this.addressFormGroup.get('calle').value : 'A completar'}, ${this.addressFormGroup.get('numero').value ? this.addressFormGroup.get('numero').value : ''}`;
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DireccionDelivery,
    public dialogRef: MatDialogRef<FormAddressComponent>,
    public formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.localData = { ...data };
  }

  ngOnInit() {
    this.buildForm();
    this.setAction();
    this.setCurrentLocation();
    this.getLocalidades();
  }

  private setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  markerDragEnd($event: any) {
    this.addressFormGroup.patchValue({
      latitud: $event.coords.lat,
      longitud: $event.coords.lng
    });
  }

  buildForm() {
    this.addressFormGroup = this.formBuilder.group({
      id: [this.localData.id],
      ultimaActualizacion: [this.localData.ultimaActualizacion],
      oculto: [this.localData.oculto],
      alias: [this.localData.alias, Validators.required],
      calle: [this.localData.calle, Validators.required],
      numero: [this.localData.numero, Validators.required],
      piso: [this.localData.piso],
      departamento: [this.localData.departamento],
      localidad: [this.localData.localidad, Validators.required],
      aclaraciones: [this.localData.aclaraciones],
      latitud: [this.localData.latitud, Validators.required],
      longitud: [this.localData.longitud, Validators.required]
    });
  }

  getLocalidades() {
    return this.http.get(`http://localhost:8080/api/v1/direcciones/localidad/all`).pipe()
      .subscribe((data: Array<Localidad>) => this.localidades = data);
  }

  setAction() {
    this.action = (this.localData && (Object.keys(this.localData).length === 0)) ? 'Añadir' : 'Editar';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.addressFormGroup.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  errorHandling = (control: string, error: string) => {
    return this.addressFormGroup.controls[control].hasError(error);
  }

}
