import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: AngularFireAuth) { }

  /* Registra un usario con email y contraseña */
  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, pass)
      .then( userData => {
        resolve(userData);
      }).catch(
        err => console.log(reject(err)));
    });
  }

  /* Login del usario con email y contraseña */
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, pass)
        .then( userData => resolve(userData),
        err => reject(err));
    });
  }

  /* Login y registro con google */
  loginGoogleUser() {
    return this.authService.signInWithPopup(new auth.GoogleAuthProvider());
  }

  /* Cerrar sesión */
  logoutUser() {
    return this.authService.signOut();
  }

  /* Averigua si hay un usuario conectado o no */
  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.authService.authState.pipe(map( auth => auth));
  }
}
