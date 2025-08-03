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
  selector: 'app-reportes-top-revisores',
  standalone: false,
  templateUrl: './reportes-top-revisores.component.html',
  styleUrl: './reportes-top-revisores.component.css'
})
export class ReportesTopRevisoresComponent {

  rol = localStorage.getItem('rol');
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
    this.obtenerPeriodos()
  }


  periodos: any[] = [];

  obtenerPeriodos() {
    this.propuestaS.getPeriodos().subscribe(res => {
      this.periodos = res;

    }, error => {
      this.periodos = [];
    })
  }


  limpiarFiltros(): void {
    this.registroForm.reset(); 
    this.fechaRango.reset();
    this.registroForm.patchValue({
      periodo: null,
      carrera: null,
    });
  }


  carrera = new FormControl({ value: null, disabled: false });
  periodo = new FormControl({ value: null, disabled: false });

  fechaRango = new FormGroup({
    fechaInicio: new FormControl<DateTime | null>(null),
    fechaFin: new FormControl<DateTime | null>(null)
  });


  registroForm = new FormGroup({
    carrera: this.carrera,
    fechaRango: this.fechaRango,
    periodo: this.periodo
  })



  carreras: any = [];
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

  dataSource: any[] = [];
  public barChartLabels: string[] = [];

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Duración de tareas', backgroundColor: 'blue' }
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Propuestas Revisadas Por Cada Revisor',
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
          text: 'Cantidad de tareas revisadas'
        }
      },

    }
  };
  displayedColumns: string[] = ['usuario', 'cantidad'];


  verReporte: boolean = false;
  seleccionCarrera = ''

  reporteTopRevisores(form: any) {
    const fechaInicioRaw = this.fechaRango.get('fechaInicio')?.value as DateTime | null;
    const fechaInicioFormatted = fechaInicioRaw
      ? fechaInicioRaw.toFormat('yyyy-MM-dd')
      : null;

    const fechaFinRaw = this.fechaRango.get('fechaFin')?.value as DateTime | null;
    const fechaFinFormatted = fechaFinRaw
      ? fechaFinRaw.toFormat('yyyy-MM-dd')
      : null;

    if (this.rol != 'direccion' && this.rol != 'coordinador') {
      this.seleccionCarrera = form.carrera
    } else {
      this.seleccionCarrera = this.carreraU!
    }
    this.reportS.getRevisionesPorUsuario('procesoTesis', this.seleccionCarrera, form.periodo, fechaInicioFormatted, fechaFinFormatted).subscribe(datos => {
      console.log("ver reporte: ", datos)
      if (Object.keys(datos).length === 0) {
        this.verReporte = false

        return this.toastr.error("No se encontraron datos")
      } else {
        this.verReporte = true
        this.dataSource = Object.entries(datos.totalRevisionesPorUsuario!).map(([usuario, cantidad]) => ({
          usuario,
          cantidad
        }));
        this.barChartLabels = this.dataSource.map(item => item.tarea);
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
          labels: this.dataSource.map(item => item.usuario),
          datasets: [
            {
              label: 'Propuestas Revisadas Por Cada Revisor',
              data: this.dataSource.map(item => item.cantidad),
              backgroundColor: this.dataSource.map((_, index) => colores[index % colores.length])
            }
          ]
        };
        this.cdr.detectChanges();
      }
   
    }, error => {
   
      console.log("ver el error: ", error)
      return this.toastr.error(error.error.error)
    })
  }


}
