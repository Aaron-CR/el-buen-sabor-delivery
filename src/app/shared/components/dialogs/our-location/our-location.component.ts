import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-location',
  templateUrl: './our-location.component.html',
  styleUrls: ['./our-location.component.scss']
})
export class OurLocationComponent implements OnInit {

  public latitude = -32.8977225;
  public longitude = -68.8417357;
  public zoom = 15;

  constructor() { }

  ngOnInit(): void {
  }

}
