import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CarreraService } from 'src/app/servicios/carreras/carrera.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-ingresar-docente',
  standalone: false,
  templateUrl: './ingresar-docente.component.html',
  styleUrl: './ingresar-docente.component.css'
})
export class IngresarDocenteComponent {

  hidePassword = true;

  ngOnInit() {
  }

  constructor(
    private ventana_: MatDialogRef<IngresarDocenteComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private vistaS: VistasService,
    private rest: LoginService,

    @Inject(MAT_DIALOG_DATA) public datos: any
  ) {
    this.registroForm.setValue({
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      cedula: '',
      celular: '',
      correo: '',
      idFacultad: ''
    });
  }

  // VALIDACIONES DE CAMPOS DE FORMULARIO
  primerNombre = new FormControl('', Validators.required);
  segundoNombre = new FormControl('');
  primerApellido = new FormControl('', Validators.required);
  segundoApellido = new FormControl('');
  cedula = new FormControl('', Validators.required);
  celular = new FormControl('', Validators.required);
  correo = new FormControl('', Validators.email);
  idFacultad = new FormControl('', Validators.required);
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
    idFacultad: this.idFacultad,
  })

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
      idFacultad: form.idFacultad,
      tipoUsuario: 'docente'
    }

    this.rest.registroUsuario(dataUsuario).subscribe(datos => {
      this.CerrarRegistro()

      this.toastr.success('Registro Existoso! ', 'Usuario y contraseña válidos', {
        timeOut: 6000,
      })
      this.router.navigate(['/listar-docentes']);
    }, error => {
      console.log("ver el error: ", error)
      console.error('Error al enviar la propuesta', error);

      let errorMessage = 'Error desconocido';
      if (typeof error.error === 'string') {
        try {
          const parsed = JSON.parse(error.error);
          errorMessage = parsed.error || errorMessage;
        } catch (e) {
          errorMessage = error.error;
        }
      } else if (error.error && typeof error.error === 'object') {
        errorMessage = error.error.error || errorMessage;
      }
      return this.toastr.error(errorMessage)
    })

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



}
