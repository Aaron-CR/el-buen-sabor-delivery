import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from './../authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user.pipe(
      take(1),
      map((user) => !!user && (user.rol.denominacion === 'cliente' || user.rol.denominacion === 'administrador')),
      tap((auth) => {
        if (!auth) {
          this.router.navigate(['/index']);
          /* this.snackBar.open
          ('¡No tienes los permisos necesarios para acceder!', 'OK', { duration: 10000, panelClass: ['app-snackbar'] }); */
        }
      })
    );
  }

}
