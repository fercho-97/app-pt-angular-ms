import { Component } from '@angular/core';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReportesService } from 'src/app/servicios/reportes/reportes.service';
import { DateTime } from 'luxon';
import { ChartData, ChartOptions } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';


@Component({
  selector: 'app-reportes-procesos-terminados',
  standalone: false,
  templateUrl: './reportes-procesos-terminados.component.html',
  styleUrl: './reportes-procesos-terminados.component.css'
})
export class ReportesProcesosTerminadosComponent {
  rolU = localStorage.getItem('rol');
  carreraU = localStorage.getItem('carrera');

  constructor(
    private toastr: ToastrService,
    public router: Router,
    public vistaS: VistasService,
    public reportS: ReportesService,
    private cdr: ChangeDetectorRef,
    private propuestaS: PropuestaService

  ) {
  }

  ngOnInit() {
    this.ObtenerCarreras(1);
    this.obtenerPeriodos();
  }

  limpiarFiltros(): void {
    this.registroForm.reset();
    this.fechaRango.reset();
    
    this.registroForm.patchValue({
      rol: null,
      periodo: null,
      carrera: null,
    });
  }

  periodos: any[] = [];

  obtenerPeriodos() {
    this.propuestaS.getPeriodos().subscribe(res => {
      this.periodos = res;

    }, error => {
      this.periodos = [];
    })
  }


  roles = [
    { id: 0, nombre: 'Secretarias' },
    { id: 1, nombre: 'Revisores' },
    { id: 2, nombre: 'Dirección' }
  ];
  carrera = new FormControl({ value: null, disabled: false },);
  rol = new FormControl({ value: null, disabled: false }, Validators.required);
  periodo = new FormControl({ value: null, disabled: false });

  fechaRango = new FormGroup({
    fechaInicio: new FormControl<DateTime | null>(null),
    fechaFin: new FormControl<DateTime | null>(null)
  });

  registroForm = new FormGroup({
    carrera: this.carrera,
    fechaRango: this.fechaRango,
    periodo: this.periodo,
    rol: this.rol
  })



  carreras: any = [];
  displayedColumnsDireccion: string[] = ['tarea', 'usuario', 'duracion'];

  ObtenerCarreras(id: any) {
    this.vistaS.obtenerCarrerasPorFacultad(id).subscribe(res => {
      console.log("ver carreras: ", res)
      if (res) {
        this.carreras = res;
      } else {
        this.carreras = [];
      }
    },
      error => {
        this.carreras = [];
        console.error('Error al obtener las propuestas', error);
      }
    );
  }
  verReporteDireccion: boolean = false;
  verReporteDireccionValidacion: boolean = false;
  verReporteDireccionRespuesta: boolean = false;
  verReporteSecretarias: boolean = false;
  verReporteDocentes: boolean = false;

  verReporte: boolean = false;

  dataSourceRespuestaFinal: any[] = [];
  dataSourceValidacionTema: any[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = ['usuario', 'duracion'];
  public barChartLabels: string[] = [];
  public barChartLabelsRespuestaFinal: string[] = [];
  public barChartLabelsValidacionTema: string[] = [];

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: '', backgroundColor: 'blue' }
    ]
  };
  public barChartDataRespuestaFinal: ChartData<'bar'> = {
    labels: this.barChartLabelsRespuestaFinal,
    datasets: [
      { data: [], label: '', backgroundColor: 'blue' }
    ]
  };

  public barChartDataValidacionTema: ChartData<'bar'> = {
    labels: this.barChartLabelsValidacionTema,
    datasets: [
      { data: [], label: '', backgroundColor: 'blue' }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Duración Promedio por Usuarios',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Usuarios'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duración (días)'
        }
      },

    }
  };

  seleccionCarrera = ''
  reporteGeneralPorRoles(form: any) {

    const fechaInicioRaw = this.fechaRango.get('fechaInicio')?.value as DateTime | null;
    const fechaInicioFormatted = fechaInicioRaw
      ? fechaInicioRaw.toFormat('yyyy-MM-dd')
      : null;

    const fechaFinRaw = this.fechaRango.get('fechaFin')?.value as DateTime | null;
    const fechaFinFormatted = fechaFinRaw
      ? fechaFinRaw.toFormat('yyyy-MM-dd')
      : null;

    if (this.rolU != 'direccion' && this.rolU != 'coordinador') {
      this.seleccionCarrera = form.carrera
    } else {
      this.seleccionCarrera = this.carreraU!
    }

    let params = {
      carrera: this.seleccionCarrera,
      periodo: form.periodo,
      desde: fechaInicioFormatted, 
      hasta: fechaFinFormatted, 
      rol: form.rol
    }

    this.reportS.getMetricasPorRol('procesoTesis', params).subscribe(datos => {
      if (Object.keys(datos).length === 0) {
        this.verReporteDireccion = false
        this.verReporteDocentes = false
        this.verReporteSecretarias = false
        this.verReporte = false
        this.cdr.detectChanges();
        return this.toastr.error("No se encontro reportes")
      } else {
        console.log("ver datos: ", datos)
        if (datos.direccion) {
          this.verReporteDireccion = true
          this.verReporte = false

          if (datos.direccion.validacionTema) {
            this.verReporteDireccionValidacion = true;
          }
          if (datos.direccion.respuestaFinal) {
            this.verReporteDireccionRespuesta = true;
          }
          const colores = [
            'rgba(255, 99, 132, 0.6)',   // rojo
            'rgba(54, 162, 235, 0.6)',   // azul
            'rgba(255, 206, 86, 0.6)',   // amarillo
            'rgba(75, 192, 192, 0.6)',   // verde agua
            'rgba(153, 102, 255, 0.6)',  // púrpura
            'rgba(255, 159, 64, 0.6)',   // naranja
            'rgba(201, 203, 207, 0.6)',  // gris claro
            'rgba(0, 123, 255, 0.6)',    // azul Bootstrap
            'rgba(40, 167, 69, 0.6)',    // verde Bootstrap
            'rgba(255, 193, 7, 0.6)',    // amarillo Bootstrap
            'rgba(220, 53, 69, 0.6)',    // rojo Bootstrap
            'rgba(23, 162, 184, 0.6)',   // cian Bootstrap
            'rgba(108, 117, 125, 0.6)',  // gris oscuro Bootstrap
            'rgba(102, 51, 153, 0.6)',   // púrpura oscuro
            'rgba(255, 105, 180, 0.6)',  // rosa fuerte
            'rgba(0, 255, 127, 0.6)',    // verde primavera
            'rgba(255, 140, 0, 0.6)',    // naranja oscuro
            'rgba(0, 191, 255, 0.6)',    // azul cielo profundo
            'rgba(139, 69, 19, 0.6)',    // marrón
            'rgba(70, 130, 180, 0.6)',   // acero azulado
            'rgba(210, 105, 30, 0.6)'    // chocolate
          ];

          this.dataSourceRespuestaFinal = datos.direccion.respuestaFinal
            ? Object.entries(datos.direccion.respuestaFinal).map(([usuario, duracion]) => ({
              usuario,
              duracion
            }))
            : [];

          this.barChartLabelsRespuestaFinal = this.dataSourceRespuestaFinal.map(item => item.usuarios);

          this.barChartDataRespuestaFinal = {
            labels: this.dataSourceRespuestaFinal.map(item => item.usuario),
            datasets: [
              {
                label: '',
                data: this.dataSourceRespuestaFinal.map(item => item.duracion),
                backgroundColor: this.dataSourceRespuestaFinal.map((_, index) => colores[index % colores.length])
              }
            ]
          };

          this.dataSourceValidacionTema = datos.direccion.validacionTema
            ? Object.entries(datos.direccion.validacionTema).map(([usuario, duracion]) => ({
              usuario,
              duracion
            }))
            : [];

          this.barChartLabelsValidacionTema = this.dataSourceValidacionTema.map(item => item.usuarios);

          this.barChartDataValidacionTema = {
            labels: this.dataSourceValidacionTema.map(item => item.usuario),
            datasets: [
              {
                label: '',
                data: this.dataSourceValidacionTema.map(item => item.duracion),
                backgroundColor: this.dataSourceValidacionTema.map((_, index) => colores[index % colores.length])
              }
            ]
          };

          this.cdr.detectChanges();
        } else if (datos.docentes) {
          //Para Docentes

          this.verReporte = true
          this.verReporteDireccion = false
          this.verReporteDocentes = true
          this.verReporteSecretarias = false

          this.dataSource = Object.entries(datos.docentes!).map(([usuarios, duracion]) => ({
            usuarios,
            duracion
          }));
          //DATOS GRAFICO
          this.barChartLabels = this.dataSource.map(item => item.usuarios);
          const colores = [
            'rgba(255, 99, 132, 0.6)',   // rojo
            'rgba(54, 162, 235, 0.6)',   // azul
            'rgba(255, 206, 86, 0.6)',   // amarillo
            'rgba(75, 192, 192, 0.6)',   // verde agua
            'rgba(153, 102, 255, 0.6)',  // púrpura
            'rgba(255, 159, 64, 0.6)',   // naranja
            'rgba(201, 203, 207, 0.6)',  // gris claro
            'rgba(0, 123, 255, 0.6)',    // azul Bootstrap
            'rgba(40, 167, 69, 0.6)',    // verde Bootstrap
            'rgba(255, 193, 7, 0.6)',    // amarillo Bootstrap
            'rgba(220, 53, 69, 0.6)',    // rojo Bootstrap
            'rgba(23, 162, 184, 0.6)',   // cian Bootstrap
            'rgba(108, 117, 125, 0.6)',  // gris oscuro Bootstrap
            'rgba(102, 51, 153, 0.6)',   // púrpura oscuro
            'rgba(255, 105, 180, 0.6)',  // rosa fuerte
            'rgba(0, 255, 127, 0.6)',    // verde primavera
            'rgba(255, 140, 0, 0.6)',    // naranja oscuro
            'rgba(0, 191, 255, 0.6)',    // azul cielo profundo
            'rgba(139, 69, 19, 0.6)',    // marrón
            'rgba(70, 130, 180, 0.6)',   // acero azulado
            'rgba(210, 105, 30, 0.6)'    // chocolate
          ];
          this.barChartData = {
            labels: this.dataSource.map(item => item.usuarios),
            datasets: [
              {
                label: '',
                data: this.dataSource.map(item => item.duracion),
                backgroundColor: this.dataSource.map((_, index) => colores[index % colores.length])
              }
            ]
          };
        } else if (datos.secretarias) {
          this.verReporte = true
          this.verReporteDireccion = false
          this.verReporteSecretarias = true
          this.verReporteDocentes = false

          this.dataSource = Object.entries(datos.secretarias!).map(([usuarios, duracion]) => ({
            usuarios,
            duracion
          }));
          //DATOS GRAFICO
          this.barChartLabels = this.dataSource.map(item => item.usuarios);
          const colores = [
            'rgba(255, 99, 132, 0.6)',   // rojo
            'rgba(54, 162, 235, 0.6)',   // azul
            'rgba(255, 206, 86, 0.6)',   // amarillo
            'rgba(75, 192, 192, 0.6)',   // verde agua
            'rgba(153, 102, 255, 0.6)',  // púrpura
            'rgba(255, 159, 64, 0.6)',   // naranja
            'rgba(201, 203, 207, 0.6)',  // gris claro
            'rgba(0, 123, 255, 0.6)',    // azul Bootstrap
            'rgba(40, 167, 69, 0.6)',    // verde Bootstrap
            'rgba(255, 193, 7, 0.6)',    // amarillo Bootstrap
            'rgba(220, 53, 69, 0.6)',    // rojo Bootstrap
            'rgba(23, 162, 184, 0.6)',   // cian Bootstrap
            'rgba(108, 117, 125, 0.6)',  // gris oscuro Bootstrap
            'rgba(102, 51, 153, 0.6)',   // púrpura oscuro
            'rgba(255, 105, 180, 0.6)',  // rosa fuerte
            'rgba(0, 255, 127, 0.6)',    // verde primavera
            'rgba(255, 140, 0, 0.6)',    // naranja oscuro
            'rgba(0, 191, 255, 0.6)',    // azul cielo profundo
            'rgba(139, 69, 19, 0.6)',    // marrón
            'rgba(70, 130, 180, 0.6)',   // acero azulado
            'rgba(210, 105, 30, 0.6)'    // chocolate
          ];
          this.barChartData = {
            labels: this.dataSource.map(item => item.usuarios),
            datasets: [
              {
                label: '',
                data: this.dataSource.map(item => item.duracion),
                backgroundColor: this.dataSource.map((_, index) => colores[index % colores.length])
              }
            ]
          };
        }


      }
    }, error => {
      console.log("ver el error: ", error)
      return this.toastr.error(error.error.error)
    }

    )
  }

}
