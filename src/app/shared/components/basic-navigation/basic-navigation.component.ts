import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DialogService } from '../dialogs/dialog.service';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-navigation',
  templateUrl: './basic-navigation.component.html',
  styleUrls: ['./basic-navigation.component.scss']
})
export class BasicNavigationComponent implements OnDestroy, OnInit {

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  public userExists = false;

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialogService: DialogService,
    private authService: AuthService,
    private router: Router
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
<<<<<<< HEAD
=======
    // this.dialogService.signIn();
>>>>>>> 15fe7402b7183dfec5c215e80c774ac9b0802a1e
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  onSignUp() {
    this.dialogService.signUp();
  }

  onSignIn() {
    this.dialogService.signIn();
  }

  onSignOut(){
    this.authService.logoutUser();
    this.router.navigate(['']);
  }

}
