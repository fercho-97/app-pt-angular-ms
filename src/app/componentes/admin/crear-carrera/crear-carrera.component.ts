import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CarreraService } from 'src/app/servicios/carreras/carrera.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-carrera',
  standalone: false,
  templateUrl: './crear-carrera.component.html',
  styleUrl: './crear-carrera.component.css'
})
export class CrearCarreraComponent {

  constructor(
    private ventana_: MatDialogRef<CrearCarreraComponent>,
    private router: Router,
    private carreraS: CarreraService,
    private toastr: ToastrService,

  ) {
  }

  carreraNombre = new FormControl('', Validators.required);

  registroForm = new FormGroup({
    carreraNombre: this.carreraNombre,
  })

  registrarCarrera(form: any) {
    let dataCarrera = {
      nombre: form.carreraNombre,
      idFacultad: 1
    }

    this.carreraS.registrarCarrera(dataCarrera).subscribe(datos => {
      this.CerrarRegistro()

      this.toastr.success('Registro Existoso! ', 'Usuario y contraseña válidos', {
        timeOut: 6000,
      })
      this.router.navigate(['/listar-carreras']);
    }, error => {

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
      this.router.navigate(['/listar-carreras']);
      return this.toastr.error(errorMessage)
    })
  }


  // METODO PARA CERRAR VENTANA DE REGISTRO
  CerrarRegistro() {
    this.ventana_.close();
  }


}
