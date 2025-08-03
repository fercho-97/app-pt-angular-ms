import { Component } from '@angular/core';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReportesService } from 'src/app/servicios/reportes/reportes.service';
import { DateTime } from 'luxon';
import { ChartData, ChartOptions, Chart } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-reportes-procesos-clasificados',
  standalone: false,
  templateUrl: './reportes-procesos-clasificados.component.html',
  styleUrl: './reportes-procesos-clasificados.component.css'
})
export class ReportesProcesosClasificadosComponent {
  rol = localStorage.getItem('rol');
  carreraU = localStorage.getItem('carrera');

  public ChartDataLabels = ChartDataLabels;

  constructor(
    private toastr: ToastrService,
    public router: Router,
    public vistaS: VistasService,
    public reportS: ReportesService,
    private cdr: ChangeDetectorRef,
    private propuestaS: PropuestaService,
  ) {
  }

  ngOnInit() {
    this.ObtenerCarreras(1);
    this.obtenerPeriodos()
  }
  limpiarFiltros(): void {
    this.registroForm.reset(); 
    this.fechaRango.reset();
    this.registroForm.patchValue({
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
  public pieChartDataCategoria: ChartData<'pie', number[], string | string[]> = {
    labels: ['No validadas', 'Rechazadas', 'Aprobadas', 'Activas'],
    datasets: [
      {
        data: [3, 1, 2, 4], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',   // rojo
          'rgba(255, 206, 86, 0.7)',   // amarillo
          'rgba(75, 192, 192, 0.7)',   // verde agua
          'rgba(54, 162, 235, 0.7)'    // azul (nuevo color para "Activas")
        ],
        borderColor: ['#fff'],
        borderWidth: 1
      }
    ]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        color: '#000',
        formatter: (value, context) => {
          const sum = context.chart.data.datasets[0].data.reduce((acc: any, val: any) => acc + val, 0);

          const percentage = (value * 100 / sum).toFixed(1) + '%';
          return percentage;
        },
        font: {
          weight: 'bold' as const,
          size: 13
        }
      }
    }
  };
  verReporte: boolean = false;
  dataSource: any[] = [];
  public displayedColumns: string[] = ['categoria', 'cantidad'];
  totalProcesos = 0;
  dataActivasFinalizadas: any = {}
  seleccionCarrera = ''
  reporteGeneral(form: any) {
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

    this.reportS.getResumenProcesos('procesoTesis', this.seleccionCarrera, form.periodo, fechaInicioFormatted, fechaFinFormatted).subscribe(datos => {
      if (Object.keys(datos).length === 0) {
        this.verReporte = false
    
        return this.toastr.error("No se encontraron datos")
      } else {
        this.verReporte = true;
        this.totalProcesos = datos["Total Procesos:"];
        this.dataSource = Object.entries(datos.Categoria).map(([categoria, cantidad]) => ({
          categoria,
          cantidad
        }));
        this.dataActivasFinalizadas = datos;

        console.log("ver datos: ", datos)
        const categoria = datos['Categoria'];
        this.pieChartDataCategoria = {
          labels: Object.keys(categoria),
          datasets: [
            {
              data: Object.values(categoria),
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)'    // azul (nuevo color para "Activas")

              ]
            }
          ]
        }

      }

    }, error => {
      console.log("ver el error: ", error)
      return this.toastr.error(error.error.error)
    }
    )

  }

}
