import { Usuario } from 'src/app/core/models/usuarios/usuario';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Cliente } from 'src/app/core/models/usuarios/cliente';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public edit = false;

  public userExists = false;

  public usuario: Usuario = {
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
    rol: null
  };

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      user => {
        if (!!user){
          this.userExists = true;
          this.usuario = user;
        }
      }
    );
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

}
