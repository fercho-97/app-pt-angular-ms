import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/servicios/login/login.service';
import { RegistroRequest } from 'src/app/models/registro-request.model';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {



  hidePassword = true;
  hidePassword2 = true;


  ngOnInit() {

  }


  // METODO PARA CERRAR VENTANA DE REGISTRO
  CerrarRegistro() {
    this.router.navigate(['/login']);
  }

  // VALIDACIONES DE CAMPOS DE FORMULARIO
  primerNombre = new FormControl('', Validators.required);
  segundoNombre = new FormControl('');
  primerApellido = new FormControl('', Validators.required);
  segundoApellido = new FormControl('');
  cedula = new FormControl('', Validators.required);
  celular = new FormControl('', Validators.required);

  correo = new FormControl('', Validators.email);
  password = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);
  idFacultad = new FormControl('', Validators.required);
  carrera = new FormControl({ value: '', disabled: true }, Validators.required);


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
    idFacultad: this.idFacultad,
    confirmPassword: this.confirmPassword,
  })

  carreras: any = [];
  facultades: any[] = [
    {
      id: 1,
      nombre: 'Ingeniería y Ciencias Aplicadas'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private cdRef: ChangeDetectorRef,
    private rest: LoginService,
    private vistaS: VistasService

  ) {

    this.registroForm.setValue({
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      cedula: '',
      celular: '',
      correo: '',
      carrera: '',
      password: '',
      idFacultad: '',
      confirmPassword: '',
    });

  }

  IngresarSoloNumeros(evt: any) {
    if (window.event) {
      var keynum = evt.keyCode;
    }
    else {
      keynum = evt.which;
    }
    // COMPROBAMOS SI SE ENCUENTRA EN EL RANGO NUMERICO Y QUE TECLAS NO RECIBIRA.
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

  registrarUsuario(form: any) {
    console.log("entrando a registrar")
    let dataUsuario: RegistroRequest = {
      primerNombre: form.primerNombre,
      segundoNombre: form.segundoNombre,
      primerApellido: form.primerApellido,
      segundoApellido: form.segundoApellido,
      cedula: form.cedula,
      celular: form.celular,
      correo: form.correo,
      password: form.password,
      fechaRegistro: new Date(),
      idCarrera: form.carrera,
      idFacultad: form.idFacultad,
      tipoUsuario: 'estudiante'
    }

    this.rest.registroUsuario(dataUsuario).subscribe(datos => {

      this.toastr.success('Registro Existoso! ', 'Usuario y contraseña válidos', {
        timeOut: 6000,
      })
      this.router.navigate(['/login'], { relativeTo: this.route, skipLocationChange: false });
    }, error => {
      console.log("ver el error: ", error)
      return this.toastr.error(error.error.error)
    })


  }

  mostrarErrorConfirmacion: boolean = true;
  verificarConfirmacion(contrasenaConfirmada: any) {
    console.log("ver con confir: ", contrasenaConfirmada.value)
    if (contrasenaConfirmada.value == this.password.value) {
      this.mostrarErrorConfirmacion = false
      console.log("mostrarErrorConfirmacion ", this.mostrarErrorConfirmacion)
      this.cdr.detectChanges();  // Fuerza la actualización de la vista
    } else {
      this.mostrarErrorConfirmacion = true
      console.log("mostrarErrorConfirmacion ", this.mostrarErrorConfirmacion)
      contrasenaConfirmada?.setErrors({ noCoinciden: true });  // Marca como error
      this.cdr.detectChanges();  // Fuerza la actualización de la vista
    }

  }


  cedulaValida: boolean = false;
  ValidarCedula(cedula: any) {
    console.log("entra a validar Cedula", cedula.value)
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


  onFacultadSeleccionada(idFacultad: number): void {
    this.vistaS.obtenerCarrerasPorFacultadDisponibles(idFacultad).subscribe(data => {
      console.log("ver carreras: ", data)
      this.carreras = data;
      const carreraControl = this.registroForm.get('carrera');
      carreraControl?.reset();
      carreraControl?.enable(); // ✅ Habilita el campo de carrera
    }, error => {
      this.carreras = [];
    });
  }



}
