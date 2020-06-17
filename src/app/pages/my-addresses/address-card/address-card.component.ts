import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onFormAddress() {
    this.dialogService.formAddress();
  }

}
