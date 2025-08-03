import { Component, OnInit, Inject } from '@angular/core';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { ToastrService } from 'ngx-toastr';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';

@Component({
  selector: 'app-metodos-asignar-revisores',
  standalone: false,
  templateUrl: './metodos-asignar-revisores.component.html',
  styleUrl: './metodos-asignar-revisores.component.css'
})
export class MetodosAsignarRevisoresComponent {
  constructor(
    private ventana_: MatDialogRef<MetodosAsignarRevisoresComponent>,
    private propuestaS: PropuestaService,
    private toastr: ToastrService,
    private vistaS: VistasService,
    private flowableS: FlowableService,

    @Inject(MAT_DIALOG_DATA) public datos: any
  ) { }

  revisor1F = new FormControl('', Validators.required);
  revisor2F = new FormControl('', Validators.required);
  documentoRubricaF = new FormControl('', Validators.required);
  archivoRubricaF = new FormControl('', Validators.required);
  documentoOficioF = new FormControl('', Validators.required);
  archivoOficioF = new FormControl('', Validators.required);

  ngOnInit() {
    this.ObtenerDocentesTutores();
  }


  CerrarRegistro() {
    this.ventana_.close();
  }

  public formulario = new FormGroup({
    documentoRubricaForm: this.documentoRubricaF,
    archivoRubricaForm: this.archivoRubricaF,
    documentoOficioForm: this.documentoOficioF,
    archivoOficioForm: this.archivoOficioF,
    revisor1Form: this.revisor1F,
    revisor2Form: this.revisor2F

  });


  tutores: any = [];
  // METORDO PARA OBTENER TUTORES
  ObtenerDocentesTutores() {
    this.vistaS.buscarDocentesPorEstado(true).subscribe((docentes: any) => {
      console.log("ver tutores: ", docentes)
      this.tutores = docentes;
    }, error => {
      this.tutores = [];
    })
  }


  // METODO PARA QUITAR ARCHIVO SELECCIONADO
  HabilitarBtnRubrica: boolean = false;
  RetirarArchivoRubrica() {
    this.archivoSubidoRubrica = [];
    this.HabilitarBtnRubrica = false;
    this.LimpiarNombreArchivoRubrica();
    this.documentoRubricaF.patchValue('');
  }
  // METODO PARA SELECCIONAR UN ARCHIVO
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

  // METODO PARA LIMPIAR NOMBRE DEL ARCHIVO SELECCIONADO
  LimpiarNombreArchivoRubrica() {
    this.formulario.patchValue({
      documentoRubricaForm: '',
    });
  }



  //-------------METODO PARA SELECCIONAR UN ARCHIVO Oficio--------------------------------
  // METODO PARA QUITAR ARCHIVO SELECCIONADO
  HabilitarBtnOficio: boolean = false;
  RetirarArchivoOficio() {
    this.archivoSubidoOficio = [];
    this.HabilitarBtnOficio = false;
    this.LimpiarNombreArchivoOficio();
    this.documentoOficioF.patchValue('');
  }

  nameFileOficio: string;
  archivoSubidoOficio: Array<File>;
  archivoSeleccionadoOficio: File | null = null;

  fileChangeOficio(element: any) {
    this.archivoSeleccionadoOficio = element.target.files[0];
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (this.archivoSeleccionadoOficio!.size > maxSizeInBytes) {
      this.toastr.error("El archivo supera el tamaño maximo")
    } else {
      this.archivoSubidoOficio = element.target.files;
      if (this.archivoSubidoOficio.length != 0) {
        const name = this.archivoSubidoOficio[0].name;
        this.formulario.patchValue({ documentoOficioForm: name });
        this.HabilitarBtnOficio = true;
      }
    }

  }

  // METODO PARA LIMPIAR NOMBRE DEL ARCHIVO SELECCIONADO
  LimpiarNombreArchivoOficio() {
    this.formulario.patchValue({
      documentoOficioForm: '',
    });
  }

  GuardarRevisores(form: any) {
    if (!this.archivoSeleccionadoRubrica) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }
    if (!this.archivoSeleccionadoOficio) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }
    this.propuestaS.asignarRevisores(
      this.datos.idProppuesta,
      form.revisor1Form,
      form.revisor2Form,
      this.archivoSeleccionadoRubrica,
      this.archivoSeleccionadoOficio,
      this.datos.taskID
    ).subscribe(response => {
      console.log('Se asigno revisores con exito.', response);
      this.CerrarRegistro()
      this.flowableS.notificarActualizacion();

      this.toastr.success('Asignación de revisores con éxito! ', '', {
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
    }
    )

  }



}
