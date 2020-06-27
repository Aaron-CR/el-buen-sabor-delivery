import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from './../services/customer.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<Usuario>;
  public uid: string;

  constructor(
    private authService: AngularFireAuth,
    private userService: UserService,
    private snackBar: MatSnackBar) {
    this.user = this.authService.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.uid = user.uid;
          return this.userService.findByUid(user.uid);
        }
        return of(null);
      })
    );
  }

  /* Registra un usario con email y contraseña */
  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData);
        }).catch(
          err => console.log(reject(err)));
    });
  }

  /* Login del usario con email y contraseña */
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  /* Login y registro con google */
  loginGoogleUser() {
    return this.authService.signInWithPopup(new auth.GoogleAuthProvider());
  }

  resetPassword(email: string){
    this.authService.sendPasswordResetEmail(email)
        .then(
          () => {
            this.snackBar
            .open('¡Correo enviado! Revisa tu casilla y sigue los pasos', 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
          },
          err => {
            this.snackBar
            .open('El email indicado no tiene usuario vinculado', 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
          }
        );
  }

  confirmNewPassword(code: string, newPassword: string){
    return this.authService.confirmPasswordReset(code, newPassword);
  }

  /* Cerrar sesión */
  logoutUser() {
    return this.authService.signOut();
  }

  /* Averigua si hay un usuario conectado o no */
  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.authService.authState.pipe(map(auth => auth));
  }

}
