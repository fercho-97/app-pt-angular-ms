import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import { ToastrService } from 'ngx-toastr';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';
@Component({
  selector: 'app-notificar-propuesta',
  standalone: false,
  templateUrl: './notificar-propuesta.component.html',
  styleUrl: './notificar-propuesta.component.css'
})
export class NotificarPropuestaComponent {

  constructor(
    public ventana: MatDialogRef<NotificarPropuestaComponent>,
    private propuestaS: PropuestaService,
    private toastr: ToastrService,
    private vistaS: VistasService,
    private flowableS: FlowableService,

    @Inject(MAT_DIALOG_DATA) public datos: any
  ) { }
  ngOnInit(): void {
    this.aprobar = this.datos.aprobar;
    this.ObtenerDocentesTutores();
    console.log('ver aprobar ', this.aprobar)
  }


  observacionesFN = new FormControl('', [
    Validators.maxLength(2000)
  ])
  documentoRubricaF = new FormControl('', Validators.required);
  archivoRubricaF = new FormControl('', Validators.required);
  docenteTutorF = new FormControl('');


  public formulario = new FormGroup({
    documentoRubricaForm: this.documentoRubricaF,
    archivoRubricaForm: this.archivoRubricaF,
    docenteTutorForm: this.docenteTutorF,
  });

  public formularioN = new FormGroup({
    observacionesForm: this.observacionesFN,
  });

  tutores: any = [];
  ObtenerDocentesTutores() {
    this.vistaS.buscarDocentesPorEstado(true).subscribe((docentes: any) => {
      console.log("ver tutores: ", docentes)
      this.tutores = docentes;

      const idTutor = this.datos?.propuesta?.tutorDocenteId;
      if (idTutor) {
        this.docenteTutorF.setValue(idTutor);
      }
    }, error => {
      this.tutores = [];
    })
  }


  // METODO PARA SELECCIONAR UN ARCHIVO
  HabilitarBtnRubrica: boolean = false;
  nameFileRubrica: string;
  archivoSubidoRubrica: Array<File>;
  archivoSeleccionadoRubrica: File | null = null;

  fileChangeRubrica(element: any) {
    this.archivoSeleccionadoRubrica = element.target.files[0];
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (this.archivoSeleccionadoRubrica!.size > maxSizeInBytes) {
      this.toastr.error("El archivo supera el tamaño maximo")
    } else {
      this.archivoSubidoRubrica = element.target.files;
      if (this.archivoSubidoRubrica.length != 0) {
        const name = this.archivoSubidoRubrica[0].name;
        this.formulario.patchValue({ documentoRubricaForm: name });
        this.HabilitarBtnRubrica = true;
      }
    }

  }

  // METODO PARA QUITAR ARCHIVO SELECCIONADO
  RetirarArchivoRubrica() {
    this.archivoSubidoRubrica = [];
    this.HabilitarBtnRubrica = false;
    this.LimpiarNombreArchivoRubrica();
    this.documentoRubricaF.patchValue('');
  }


  // METODO PARA LIMPIAR NOMBRE DEL ARCHIVO SELECCIONADO
  LimpiarNombreArchivoRubrica() {
    this.formulario.patchValue({
      documentoRubricaForm: '',
    });
  }

  aprobar = false;

  CerrarVentana(): void {
    this.ventana.close(false);
  }

  AprobarPropuesta(form: any) {
    if (!this.archivoSeleccionadoRubrica) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }


    this.propuestaS.aprobarPropuesta(this.datos.propuesta.id,
      form.observacionesForm, form.docenteTutorForm, this.archivoSeleccionadoRubrica,
      this.datos.propuesta.tareaId).subscribe(response => {
        console.log('Propuesta aprobada con éxito', response);
        this.CerrarVentana()
        this.flowableS.notificarActualizacion();

        this.toastr.success('Propuesta aprobada con éxito! ', '', {
          timeOut: 6000,
        })

      }, error => {
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

  NegarPropuesta(form: any) {

    this.propuestaS.negarPropuesta(this.datos.propuesta.id,
      form.observacionesForm, this.datos.propuesta.tareaId).subscribe(response => {
        console.log('Propuesta aprobada con éxito', response);
        this.CerrarVentana()
        this.flowableS.notificarActualizacion();

        this.toastr.success('Propuesta aprobada con éxito! ', '', {
          timeOut: 6000,
        })

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
        return this.toastr.error(errorMessage)
      })
  }

}
