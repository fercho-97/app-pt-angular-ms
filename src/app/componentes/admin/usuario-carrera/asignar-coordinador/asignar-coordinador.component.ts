import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarreraService } from 'src/app/servicios/carreras/carrera.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asignar-coordinador',
  standalone: false,
  templateUrl: './asignar-coordinador.component.html',
  styleUrl: './asignar-coordinador.component.css'
})
export class AsignarCoordinadorComponent {

  docenteF = new FormControl('', Validators.required);

  public formulario = new FormGroup({
    docenteForm: this.docenteF,
  });

  constructor(
    private vistaS: VistasService,
    private carreraS: CarreraService,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    public ventana: MatDialogRef<AsignarCoordinadorComponent>,
    private toastr: ToastrService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
    
    this.ObtenerDocentes();
  }


  tutores: any = [];
  ObtenerDocentes() {
    this.vistaS.buscarDocentesPorEstado(true).subscribe((docentes: any) => {
      console.log("ver tutores: ", docentes)
      this.tutores = docentes;
    }, error => {
      this.tutores = [];
    })
  }


  AsignarCoordinador(form: any) {

    this.carreraS.registrarAutoridad(this.datos.carrera.idCarrera, form.docenteForm).subscribe(datos => {
      this.CerrarVentana()

      this.toastr.success('Registro Existoso! ', 'Asignación de Coordinador', {
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

  CerrarVentana(): void {
    this.ventana.close(false);
  }



}
