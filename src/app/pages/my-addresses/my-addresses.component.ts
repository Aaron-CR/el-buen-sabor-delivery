import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.scss']
})
export class MyAddressesComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onFormAddress() {
    this.dialogService.formAddress();
  }

}
