import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { LoginService } from 'src/app/servicios/login/login.service';
import { CarreraService } from 'src/app/servicios/carreras/carrera.service';
@Component({
  selector: 'app-crear-usuario-direccion',
  standalone: false,
  templateUrl: './crear-usuario-direccion.component.html',
  styleUrl: './crear-usuario-direccion.component.css'
})
export class CrearUsuarioDireccionComponent {

  hidePassword = true;

  ngOnInit() {
    console.log("ver carrera: ", this.datos.carrera.idCarrera)
  }

  constructor(
    private ventana_: MatDialogRef<CrearUsuarioDireccionComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private cdRef: ChangeDetectorRef,
    private vistaS: VistasService,
    private rest: LoginService,
    private carreraS: CarreraService,
    @Inject(MAT_DIALOG_DATA) public datos: any
  ) {
  }

  // VALIDACIONES DE CAMPOS DE FORMULARIO
  correo = new FormControl('', Validators.email);
  password = new FormControl('', Validators.required);
  idFacultad = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);
  carreras: any = [];

  registroForm = new FormGroup({
    correo: this.correo,
  })


  // METODO PARA CERRAR VENTANA DE REGISTRO
  CerrarRegistro() {
    this.ventana_.close();
  }

  mostrarErrorConfirmacion: boolean = true;
  verificarConfirmacion(contrasenaConfirmada: any) {
    console.log("ver con confir: ", contrasenaConfirmada.value)
    if (contrasenaConfirmada.value == this.password.value) {
      this.mostrarErrorConfirmacion = false
      console.log("mostrarErrorConfirmacion ", this.mostrarErrorConfirmacion)
      this.cdr.detectChanges();  
    } else {
      this.mostrarErrorConfirmacion = true
      console.log("mostrarErrorConfirmacion ", this.mostrarErrorConfirmacion)
      contrasenaConfirmada?.setErrors({ noCoinciden: true }); 
      this.cdr.detectChanges(); 
    }
  }


  registrarUsuario(form: any) {
    let dataUsuario = {
      primerNombre: null,
      segundoNombre: null,
      primerApellido: null,
      segundoApellido: null,
      cedula: null,
      celular: null,
      correo: form.correo,
      password: null,
      fechaRegistro: null,
      idCarrera: this.datos.carrera.idCarrera,
      idFacultad: null,
      tipoUsuario: null
    }

    this.carreraS.registrarUsuarioCarrera(dataUsuario).subscribe(datos => {
      this.CerrarRegistro()

      this.toastr.success('Registro Existoso! ', 'Usuario y contraseña válidos', {
        timeOut: 6000,
      })
      this.router.navigate(['/listar-carreras']);
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


}
