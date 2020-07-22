import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { DialogService } from '../dialogs/dialog.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public userExists = false;
  public userName = '';
  public userLastName = '';
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialogService: DialogService,
    public authService: AuthService,
    private router: Router,
    public cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (!!user) {
        this.userExists = true;
        this.userName = user.nombre;
        this.userLastName = user.apellido;
      }
    });
  }

  onSignUp() {
    this.dialogService.signUp();
  }

  onSignIn() {
    this.dialogService.signIn();
  }

  onSignOut() {
    this.userExists = false;
    this.authService.logoutUser();
    this.router.navigate(['']);
  }

}

