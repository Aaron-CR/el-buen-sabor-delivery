import { Component } from '@angular/core';
import { DialogService } from '../dialogs/dialog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public year = new Date().getFullYear();

  constructor(private dialogService: DialogService) { }

  onSignUp() {
    this.dialogService.signUp();
  }

  onSignIn() {
    this.dialogService.signIn();
  }

  ourLocation() {
    this.dialogService.ourLocation();
  }

  onSchedule() {
    this.dialogService.schedule();
  }

}
