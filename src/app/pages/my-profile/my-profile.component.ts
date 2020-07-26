import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuarios/usuario';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/core/models/usuarios/cliente';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private userSubject = new BehaviorSubject<Cliente>(null);
  public user$ = this.userSubject.asObservable();
  public profileForm: FormGroup;
  public edit = false;
  public cliente: Cliente;

  constructor(private authService: AuthService, private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.subscription.add(this.authService.user.subscribe(
      (user) => {
        this.customerService.findByUid(user.uid).subscribe(
          userData => {
            this.userSubject.next(userData);
            this.cliente = userData;
            this.buildForm();
          }
        );
      }
    ));
  }

  buildForm() {
    this.profileForm = this.fb.group({
      id: [this.cliente.id],
      ultimaActualizacion: [this.cliente.ultimaActualizacion],
      oculto: [this.cliente.oculto],
      eliminado: [this.cliente.eliminado],
      fechaAlta: [this.cliente.fechaAlta],
      nombre: [this.cliente.nombre, Validators.required],
      apellido: [this.cliente.apellido, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      email: [this.cliente.email],
      uid: [this.cliente.uid],
      rol: [this.cliente.rol],
      direccionesEnvio: [this.cliente.direccionesEnvio]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditPassword() {
    this.authService.resetPassword(this.cliente.email);
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  errorHandling = (control: string, error: string) => {
    return this.profileForm.controls[control].hasError(error);
  }

  onSubmit() {
    // this.customerService.update()
    console.log('UPDATE USUARIO');
    console.log(this.profileForm.value);
    // this.cliente.nombre = 'Cliente 2';

    this.updateUser(this.profileForm.value);
  }

  updateUser(cliente: Cliente){
    this.customerService.update(cliente, cliente.id).subscribe(
      user => {
        this.cliente = user;
        this.userSubject.next(user);
        this.toggleEdit();
      }
    );
  }

}
