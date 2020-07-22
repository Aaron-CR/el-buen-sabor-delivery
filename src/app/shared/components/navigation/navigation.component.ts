import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { DialogService } from '../dialogs/dialog.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuarios/usuario';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public user: Usuario;
  public userExists = false;
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());

  constructor(
    public authService: AuthService,
    public dialogService: DialogService,
    public cartService: ShoppingCartService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription.add(this.authService.user.subscribe((user) => {
      if (!!user) {
        this.user = user;
        this.userExists = true;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

