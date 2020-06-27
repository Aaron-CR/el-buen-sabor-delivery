import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public userExists = false;

  constructor( private authService: AuthService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      user => {
        if (!!user){
          this.userExists = true;
        } else {
          this.dialogService.signIn();
        }
      }
    );
  }

  onSignIn(){
    this.dialogService.signIn();
  }

}
