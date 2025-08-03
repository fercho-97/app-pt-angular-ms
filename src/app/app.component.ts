import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end-tesis';
  constructor(
    public location: Location,
  ) { }

  removerLogin() {
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania === 'login') {
      return false;
    } else {
      return true;
    }
  }

  removerRegistro() {
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania === 'registro-usuario') {
      return false;
    } else {
      return true;
    }
  }

  removerOlvidoContrasena() {
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania === 'olvidar-contrasenia') {
      return false;
    } else {
      return true;
    }
  }

  removerVerificarCorreo() {
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania.startsWith('vista-verificacion-correo')) {
      return false;
    } else {
      return true;
    }
  }

  restaurarContraseana() {
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania.startsWith('restaurar-contrasenia')) {
      return false;
    } else {
      return true;
    }
  }

  removerVerificarPassword() {
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1);
    if (tituloPestania.startsWith('password-docente')) {
      return false;
    } else {
      return true;
    }
  }


  removerMain() {
    var tituloPestania = this.location.prepareExternalUrl(this.location.path());
    tituloPestania = tituloPestania.slice(1).split("/")[0];
    if (tituloPestania === 'confirmar-contrasenia' || tituloPestania === 'login' ||
      tituloPestania === 'olvidar-contrasenia' || tituloPestania === 'vista-verificacion-correo' ||
      tituloPestania === 'password-docente' ||
      tituloPestania === 'registro-usuario' ||
      tituloPestania === 'restaurar-contrasenia') {
      return true;
    } else {
      return false;
    }
  }

}
