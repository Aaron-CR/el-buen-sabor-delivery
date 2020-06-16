import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public edit = false;

  constructor() { }

  ngOnInit(): void { }

  toggleEdit() {
    this.edit = !this.edit;
  }

}
