import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public userExists = false;
  public edit = false;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.subscription.add(this.authService.user.subscribe((user) =>
      (!!user) ? this.userExists = true : this.onSignIn()));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSignIn() {
    this.dialogService.signIn();
  }

}
