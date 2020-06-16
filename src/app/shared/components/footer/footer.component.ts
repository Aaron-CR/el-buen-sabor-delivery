import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialogs/dialog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public year = new Date().getFullYear();

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onMenu() {
    this.dialogService.formAddress();
  }

  onFormAddress() {
    this.dialogService.formAddress();
  }

  onSelectAddress() {
    this.dialogService.selectAddress();
  }

  onBillingDetails() {
    this.dialogService.billingDetails();
  }

  onSchedule() {
    this.dialogService.schedule();
  }

}
