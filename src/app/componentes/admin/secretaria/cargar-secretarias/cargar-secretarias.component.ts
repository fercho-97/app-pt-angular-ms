import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { LoginService } from 'src/app/servicios/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cargar-secretarias',
  standalone: false,
  templateUrl: './cargar-secretarias.component.html',
  styleUrl: './cargar-secretarias.component.css'
})
export class CargarSecretariasComponent {

  hidePassword = true;

  constructor(
    private ventana_: MatDialogRef<CargarSecretariasComponent>,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private vistaS: VistasService,
    private rest: LoginService,
    private router: Router,

  ) {
  }

  // VALIDACIONES DE CAMPOS DE FORMULARIO
  primerNombre = new FormControl('', Validators.required);
  segundoNombre = new FormControl('');
  primerApellido = new FormControl('', Validators.required);
  segundoApellido = new FormControl('');
  cedula = new FormControl('', Validators.required);
  celular = new FormControl('', Validators.required);
  correo = new FormControl('', Validators.email);
  password = new FormControl('');
  idFacultad = new FormControl('', Validators.required);
  carrera = new FormControl('', Validators.required);
  carreras: any = [];
  facultades: any[] = [
    {
      id: 1,
      nombre: 'Ingeniería y Ciencias Aplicadas'
    }
  ];

  registroForm = new FormGroup({
    primerNombre: this.primerNombre,
    segundoNombre: this.segundoNombre,
    primerApellido: this.primerApellido,
    segundoApellido: this.segundoApellido,
    cedula: this.cedula,
    celular: this.celular,
    correo: this.correo,
    carrera: this.carrera,
    password: this.password,
    idFacultad: this.idFacultad
  })

  cedulaValida: boolean = false;
  ValidarCedula(cedula: any) {
    const inputElement = cedula.value;
    const cad: string = inputElement;
    let total: number = 0;
    const longitud: number = cad.length;
    const longcheck: number = longitud - 1;

    if (cad !== "" && longitud === 10) {
      for (let i = 0; i < longcheck; i++) {
        let num = parseInt(cad.charAt(i), 10);
        if (isNaN(num)) return;
        if (i % 2 === 0) {
          num *= 2;
          if (num > 9) num -= 9;
        }
        total += num;
      }
      total = total % 10 ? 10 - (total % 10) : 0;
      if (parseInt(cad.charAt(longitud - 1), 10) === total) {
        this.cedulaValida = true;
        console.log("Cédula Válida")
      } else {
        this.cedulaValida = false;
        this.cdRef.detectChanges();
        this.registroForm.controls['cedula'].setErrors({ invalidCedula: true }); // Cédula inválida
        console.log("Cédula Inválida")
      }
    }
  }

  IngresarSoloNumeros(evt: any) {
    if (window.event) {
      var keynum = evt.keyCode;
    }
    else {
      keynum = evt.which;
    }
    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6) {
      return true;
    }
    else {
      this.toastr.info('No se admite el ingreso de letras.', 'Usar solo números.', {
        timeOut: 6000,
      })
      return false;
    }
  }

  // METODO PARA CERRAR VENTANA DE REGISTRO
  CerrarRegistro() {
    this.ventana_.close();
  }

  onFacultadSeleccionada(idFacultad: number): void {
    this.vistaS.obtenerCarrerasPorFacultadDisponibles(idFacultad).subscribe(data => {
      console.log("ver carreras: ", data)
      this.carreras = data;
      const carreraControl = this.registroForm.get('carrera');
      carreraControl?.reset();
      carreraControl?.enable(); 
    }, error => {
      this.carreras = [];
    });
  }

  registrarUsuario(form: any) {
    let dataUsuario = {
      primerNombre: form.primerNombre,
      segundoNombre: form.segundoNombre,
      primerApellido: form.primerApellido,
      segundoApellido: form.segundoApellido,
      cedula: form.cedula,
      celular: form.celular,
      correo: form.correo,
      password: "-",
      fechaRegistro: new Date(),
      idCarrera: form.carrera,
      idFacultad: form.idFacultad,
      tipoUsuario: 'secretaria'
    }
    this.rest.registroUsuario(dataUsuario).subscribe(datos => {
      this.CerrarRegistro()

      this.toastr.success('Registro Existoso! ', 'Usuario y contraseña válidos', {
        timeOut: 6000,
      })
      this.router.navigate(['/listar-secretaria']);
    }, error => {
      console.log("ver el error: ", error)
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
