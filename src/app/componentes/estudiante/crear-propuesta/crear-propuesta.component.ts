import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';

@Component({
  selector: 'app-crear-propuesta',
  standalone: false,
  templateUrl: './crear-propuesta.component.html',
  styleUrl: './crear-propuesta.component.css'
})
export class CrearPropuestaComponent implements OnInit {

  hoy = DateTime.now().toFormat("dd-MM-yy");
  archivoSeleccionado: File | null = null;

  estudiantes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María López' },
    { id: 3, nombre: 'Carlos Sánchez' },
    { id: 4, nombre: 'Ana Martínez' },
    { id: 5, nombre: 'Pedro Gómez' }
  ];

  ngOnInit() {
    console.log(this.hoy)
    this.ObtenerDocentesTutores();
    this.categoriaF.valueChanges.subscribe(valor => {
      console.log('Categoría seleccionada:', valor);
    });
  }

  tipos: string[] = ['Proyecto de Integración', 'Proyecto de Investigación'];
  categorias: string[] = ['unimodal', 'multimodal'];

  constructor(
    private ventana_: MatDialogRef<CrearPropuestaComponent>,
    private propuestaS: PropuestaService,
    private toastr: ToastrService,
    private vistaS: VistasService,

    @Inject(MAT_DIALOG_DATA) public datos: any
  ) { }

  tipoF = new FormControl('', Validators.required);
  categoriaF = new FormControl('', Validators.required);
  documentoF = new FormControl('', Validators.required);
  archivoF = new FormControl('', Validators.required);
  temaF = new FormControl('', [
    Validators.required,
    Validators.maxLength(1500)
  ])
  estudianteDosF = new FormControl(null, Validators.email);
  estudianteTresF = new FormControl(null, Validators.email);
  docenteTutorF = new FormControl('');

  fechaF = new FormControl(this.hoy);


  public formulario = new FormGroup({
    tipoForm: this.tipoF,
    categoriaForm: this.categoriaF,
    documentoForm: this.documentoF,
    archivoForm: this.archivoF,
    estudianteDosForm: this.estudianteDosF,
    estudianteTresForm: this.estudianteTresF,
    docenteTutorForm: this.docenteTutorF,
    temaForm: this.temaF,
    fechaForm: this.fechaF,
  });


  // METODO PARA CERRAR VENTANA DE REGISTRO
  CerrarRegistro() {
    this.ventana_.close();
  }

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
  HabilitarBtn: boolean = false;
  RetirarArchivo() {
    this.archivoSubido = [];
    this.HabilitarBtn = false;
    this.LimpiarNombreArchivo();
    this.documentoF.patchValue('');
  }
  // METODO PARA SELECCIONAR UN ARCHIVO
  nameFile: string;
  archivoSubido: Array<File>;
  fileChange(element: any) {
    this.archivoSeleccionado = element.target.files[0];
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (this.archivoSeleccionado!.size > maxSizeInBytes) {
      this.toastr.error("El archivo supera el tamaño maximo")
    } else {
      this.archivoSubido = element.target.files;
      if (this.archivoSubido.length != 0) {
        const name = this.archivoSubido[0].name;
        this.formulario.patchValue({ documentoForm: name });
        this.HabilitarBtn = true;
      }
    }

  }


  // METODO PARA LIMPIAR NOMBRE DEL ARCHIVO SELECCIONADO
  LimpiarNombreArchivo() {
    this.formulario.patchValue({
      documentoForm: '',
    });
  }

  GuardarDatosPropuesta(form: any) {
    if (!this.archivoSeleccionado) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }

    if (form.estudianteDosForm)

      console.log("doente tutor form", this.docenteTutorF)
    this.propuestaS.guardarPropuesta(
      form.tipoForm,
      form.temaForm,
      form.categoriaForm,
      localStorage.getItem('correo') || '',
      this.archivoSeleccionado,
      form.estudianteDosForm,
      form.estudianteTresForm,
      form.docenteTutorForm,
    ).subscribe(response => {
      console.log('Propuesta enviada con éxito', response);
      this.CerrarRegistro()
      this.toastr.success('Propuesta enviada con éxito! ', '', {
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

    });
  }

}
