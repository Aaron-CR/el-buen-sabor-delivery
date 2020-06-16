import { Component, OnInit } from '@angular/core';

interface Direccion {
  alias: string;
  calle: string;
}

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss']
})
export class SelectAddressComponent implements OnInit {

  direcciones: Direccion[] = [
    { alias: 'Casa', calle: 'San Martín 454, Mendoza, Mendoza' },
    { alias: 'Trabajo', calle: 'Calle 2312, Mendoza' },
    { alias: 'Otro', calle: 'Segunda Calle 213, Mendoza, Mendoza' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
