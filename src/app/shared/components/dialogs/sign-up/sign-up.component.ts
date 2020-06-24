import { CustomerService } from './../../../services/customer.service';
import { Cliente } from './../../../../core/models/usuarios/cliente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../dialog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpFormGroup: FormGroup;
  public hide = true;

  public usuario: Cliente = {
    id: 0,
    fechaAlta: null,
    ultimaActualizacion: null,
    oculto: false,
    eliminado: false,
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    uid: '',
    rol: null,
    direccionesEnvio: []
  };

  constructor(
    public formBuilder: FormBuilder,
    public dialogService: DialogService,
    private router: Router,
    private authService: AuthService,
    private userService: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signUpFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignUp(signUpFormGroup: FormGroup) {
    this.authService.registerUser(signUpFormGroup.value.email, signUpFormGroup.value.password)
    .then((res) => {
      this.authService.isAuth().subscribe(
        user => {
          if (user) {
            this.usuario.uid = user.uid;
            this.usuario.email = user.email;
            this.usuario.nombre = signUpFormGroup.value.nombre;
            this.usuario.apellido = signUpFormGroup.value.apellido;
            this.usuario.telefono = signUpFormGroup.value.telefono;

            console.log(this.usuario);

            this.userService.create(this.usuario).subscribe( cliente => {
              this.onSignUpRedirect();
            });
          }
        },
        err => {
          this.snackBar.open(err.message, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
      });
    }).catch(err => {
        this.snackBar.open(err.message, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    });
  }

  onGoogleSignUp(){
    this.authService.loginGoogleUser()
    .then((res) => {
      this.authService.isAuth().subscribe(
        user => {
          if (user) {
            this.usuario.uid = user.uid;
            this.usuario.email = user.email;
            this.usuario.nombre = user.displayName;
            this.usuario.telefono = user.phoneNumber;

            console.log(this.usuario);

            this.userService.create(this.usuario).subscribe( cliente => {
              this.onSignUpRedirect();
            });
          }
        },
        err => {
          this.snackBar.open(err.message, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
      });
    }).catch(err => {
      this.snackBar.open(err.message, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    });
  }

  onSignIn() {
    this.dialogService.signIn();
  }

  onSignUpRedirect(): void {
    this.router.navigate(['/menu']);
  }

}
