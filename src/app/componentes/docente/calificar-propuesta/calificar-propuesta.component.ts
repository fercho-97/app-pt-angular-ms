import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import { ToastrService } from 'ngx-toastr';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { DateTime } from 'luxon';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';
import { ArchivoService } from 'src/app/servicios/archivos/archivo.service';

@Component({
  selector: 'app-calificar-propuesta',
  standalone: false,
  templateUrl: './calificar-propuesta.component.html',
  styleUrl: './calificar-propuesta.component.css'
})
export class CalificarPropuestaComponent implements OnInit {

  constructor(
    private ventana_: MatDialogRef<CalificarPropuestaComponent>,
    private propuestaS: PropuestaService,
    private toastr: ToastrService,
    private vistaS: VistasService,
    private flowableS: FlowableService,
    public archivosS: ArchivoService,
    @Inject(MAT_DIALOG_DATA) public datos: any
  ) { }

  verpropuesta: any = {}
  ngOnInit(): void {
    console.log("ver datos Propuesta: ", this.datos.propuesta);
    this.verpropuesta = this.datos.propuesta
    this.BuscarIDDocente();
  }
  documentoRubricaF = new FormControl('', Validators.required);
  archivoRubricaF = new FormControl('', Validators.required);
  observacionesF = new FormControl('', [
    Validators.required,
    Validators.maxLength(2000)
  ])

  notaF = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(20)
  ]);


  vistaDocente: any = {}

  public formulario = new FormGroup({
    documentoRubricaForm: this.documentoRubricaF,
    archivoRubricaForm: this.archivoRubricaF,
    notaForm: this.notaF,
    observacionesForm: this.observacionesF
  });

  // METODO PARA CERRAR VENTANA DE REGISTRO
  CerrarRegistro() {
    this.ventana_.close();
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

  BuscarIDDocente() {
    this.vistaS.buscarDocentePorIdUsuario(Number(localStorage.getItem("idUsuario"))).subscribe(response => {
      this.vistaDocente = response
      console.log("ver vista usuario: ", this.vistaDocente)

    }, error => {
      console.log("no se ha encontrado Vista Docente")
    })
  }


  GuardarRevision(form: any) {
    if (!this.archivoSeleccionadoRubrica) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }

    this.propuestaS.calificarPropuesta(
      this.datos.propuesta.id,
      form.notaForm,
      form.observacionesForm,
      this.vistaDocente.idDocente,
      this.archivoSeleccionadoRubrica,
      this.datos.propuesta.tareaId
    ).subscribe(response => {
      console.log('Propuesta calificada con éxito', response);
      this.CerrarRegistro()
      this.flowableS.notificarActualizacion();

      this.toastr.success('Propuesta calificada con éxito! ', '', {
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

  AbrirArchivo(nombre: string) {
    this.archivosS.abrirArchivo(nombre).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: () => {
        alert("Error al abrir archivo.");
      }
    });
  }



}
