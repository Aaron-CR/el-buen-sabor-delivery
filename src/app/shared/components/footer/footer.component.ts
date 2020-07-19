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

  onSignUp() {
    this.dialogService.signUp();
  }

  onSignIn() {
    this.dialogService.signIn();
  }

  onFormAddress() {
    this.dialogService.formAddress({});
  }

  onSelectAddress() {
    this.dialogService.selectAddress();
  }

  onSchedule() {
    this.dialogService.schedule();
  }

}
