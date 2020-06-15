import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss']
})
export class FormAddressComponent implements OnInit {

  public addressFormGroup: FormGroup;
  public latitude: number;
  public longitude: number;
  public zoom = 15;

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.setCurrentLocation();
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
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      aclaraciones: [''],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required]
    });
  }

}
