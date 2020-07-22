import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from '../dialogs/dialog.service';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { MatSidenav } from '@angular/material/sidenav';
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

  @ViewChild('drawer') drawer: MatSidenav;

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
    this.drawer.close();
    this.authService.logoutUser();
    this.router.navigate(['']);
  }

}

