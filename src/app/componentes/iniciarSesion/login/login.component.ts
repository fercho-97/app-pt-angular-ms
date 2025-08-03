import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../servicios/login/login.service';
import { DateTime, Duration } from 'luxon';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})

export class LoginComponent implements OnInit {

  intentos: number = 0;
  title = 'login';
  hide1 = true;
  url: string = '';

  // ALMACENAMIENTO DATOS USUARIO INGRESADO
  datosUsuarioIngresado: any = [];

  // VALIDACIONES DE CAMPOS DE FORMULARIO
  userMail = new FormControl('', Validators.required);
  pass = new FormControl('', Validators.required);

  public formulario = new FormGroup({
    usuarioF: this.userMail,
    passwordF: this.pass
  });

  constructor(
    // public rest: LoginService,
    // public restU: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private rest: LoginService
    //private asignacionesService: AsignacionesService,
  ) {
    this.formulario.setValue({
      usuarioF: '',
      passwordF: ''
    });
  }

  latitud: number = -0.1918213;
  longitud: number = -78.4875258;

  private options = {
    enableHighAccuracy: false,
    maximumAge: 30000,
    timeout: 15000
  };

  ngOnInit(): void {
    this.url = this.router.url;
    this.Geolocalizar();
  }

  // METODO QUE PERMITE ACCEDER A UBICACION DEL USUARIO
  Geolocalizar() {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (objPosition) => {
          this.latitud = objPosition.coords.latitude;
          this.longitud = objPosition.coords.longitude;
        }, (objPositionError) => {

          switch (objPositionError.code) {
            case objPositionError.PERMISSION_DENIED:
              // NO ES POSIBLE ACCEDER A LA POSICION DEL USUARIO
              break;
            case objPositionError.POSITION_UNAVAILABLE:
              // NO SE HA PODIDO ACCEDER A LA INFORMACION DE SU POSICION
              break;
            case objPositionError.TIMEOUT:
              // EL SERVICIO HA TARDADO DEMASIADO TIEMPO EN RESPONDER
              break;
            default:
            // ERROR DESCONOCIDO
          }
        }, this.options);
    }
    else {
      // EL NAVEGADOR NO SOPORTA LA API DE GEOLOCALIZACION
    }
  }

  // MENSAJE DE ERROR AL INGRESAR INFORMACION
  ObtenerMensajeCampoUsuarioError() {
    if (this.userMail.hasError('required')) {
      return 'Ingresar nombre de usuario.';
    }
    return 'Ingresar nombre de usuario.';

  }

  ObtenerMensajeCampoContraseniaError() {
    if (this.pass.hasError('required')) {
      return 'Ingresar contraseña.';
    }
    return 'Ingresar contraseña.';

  }

  // VALIDACION DE INGRESO DE DATOS DE USUARIO - INTENTOS LIMITADOS
  ValidarUsuario(form: any) {

    var f = DateTime.now();

    if (form.usuarioF.trim().length === 0) return;
    if (form.passwordF.trim().length === 0) return;

    var local: boolean;
    this.intentos = this.intentos + 1;
    var hora = localStorage.getItem('time_wait');

    if (hora != undefined) {
      if (f.toFormat('HH:mm:ss') > hora) {
        localStorage.removeItem('time_wait');
        this.intentos = 0;
        local = false;
      }
      else {
        local = true;
      }
    }
    else {
      local = false;
    }
    if (local === false) {
      this.IniciarSesion(form);
    }
    else {
      this.toastr.error('Intentelo más tarde.', 'Ha excedido el número de intentos.', {
        timeOut: 3000,
      });
    }

  }

  // METODO PARA INICIAR SESION
  IniciarSesion(form: any) {

    let dataUsuario = {
      correo: form.usuarioF,
      password: form.passwordF,
    };

    this.rest.ValidarCredenciales(dataUsuario).subscribe(datos => {
      console.log("ver datos: ", datos)
      localStorage.setItem('rol', datos.rol);
      localStorage.setItem('id', datos.id);
      localStorage.setItem('idUsuario', datos.idUsuario);
      localStorage.setItem('correo', form.usuarioF);
      localStorage.setItem('carrera', datos.nombreCarrera);
      localStorage.setItem('apellido', datos.primerApellido);
      localStorage.setItem('token', datos.token);
      localStorage.setItem('roles', JSON.stringify(datos.roles));
      localStorage.setItem('nombreUsuario', datos.primerNombre + ' ' + datos.primerApellido);
      localStorage.setItem('facultad', datos.nombreFacultad);

      this.toastr.success('Ingreso Existoso! ' + datos.primerNombre + ' ' + datos.segundoNombre, 'Usuario y contraseña válidos', {
        timeOut: 6000,
      })

      this.router.navigate(['/bienvenida'], { relativeTo: this.route, skipLocationChange: false });
      
    }, error => {
      console.error('Error al enviar la propuesta', error);

      let errorMessage = 'Error desconocido';
      if (typeof error.error === 'string') {
        try {
          // Parsea el JSON stringificado para convertirlo en objeto
          const parsed = JSON.parse(error.error);
          // parsed.error es el campo “error” con tu mensaje
          errorMessage = parsed.error || errorMessage;
        } catch (e) {
          // Si no es JSON válido, muestra el string crudo
          errorMessage = error.error;
        }
      } else if (error.error && typeof error.error === 'object') {
        // En caso de que el backend ya lo devolviera como objeto
        errorMessage = error.error.error || errorMessage;
      }
      return this.toastr.error(errorMessage)
    })

  }


}
