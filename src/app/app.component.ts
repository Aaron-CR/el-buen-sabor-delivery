import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'el-buen-sabor-delivery';

  public userExists = false;

  constructor(private authService: AuthService){

  }

  ngOnInit(){
    this.authService.user.subscribe((user) => {
      if (!!user && (user.rol.denominacion === 'cliente' || user.rol.denominacion === 'administrador')){
        this.userExists = true;
      }
    });
  }
}
