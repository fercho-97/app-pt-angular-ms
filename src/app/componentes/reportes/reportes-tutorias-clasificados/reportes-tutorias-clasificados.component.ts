import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReportesService } from 'src/app/servicios/reportes/reportes.service';
import { DateTime } from 'luxon';
import { ChartData, ChartOptions } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportes-tutorias-clasificados',
  standalone: false,
  templateUrl: './reportes-tutorias-clasificados.component.html',
  styleUrl: './reportes-tutorias-clasificados.component.css'
})
export class ReportesTutoriasClasificadosComponent {
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

  verReporte: boolean = false;

  public barChartData!: ChartData<'bar'>;
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, 

    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Estado de Propuestas por Tutor'
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Tutores'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Cantidad'
        }
      }
    }
  };


  displayedColumns: string[] = ['tutor', 'Aprobadas', 'Rechazadas', 'No validadas'];
  dataSource: any[] = [];
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

    this.reportS.getTutoriasClasificadas('procesoTesis', this.seleccionCarrera, form.periodo, fechaInicioFormatted, fechaFinFormatted).subscribe(datos => {
      if (Object.keys(datos).length === 0) {
        this.verReporte = false
        return this.toastr.error("No se encontraron datos")
      } else {
        this.verReporte = true;
        this.dataSource = Object.entries(datos).map(([tutor, conteos]: any) => ({
          tutor,
          Aprobadas: conteos['Aprobadas'] || 0,
          Rechazadas: conteos['Rechazadas'] || 0,
          'No validadas': conteos['No validadas'] || 0
        }));
        console.log("ver datos: ", datos);
        const labels = Object.keys(datos);
        const tipos = ["Aprobadas", "Rechazadas", "No validadas"];
        const colores = {
          "Aprobadas": 'rgba(76, 175, 80, 0.6)',       // Verde translúcido
          "Rechazadas": 'rgba(244, 67, 54, 0.6)',      // Rojo translúcido
          "No validadas": 'rgba(255, 193, 7, 0.6)'     // Amarillo
        };

        const datasets = tipos.map(tipo => ({
          label: tipo,
          data: labels.map(tutor => datos[tutor][tipo] || 0),
          backgroundColor: colores[tipo]
        }));

        this.barChartData = {
          labels,
          datasets
        };

      }
    }, error => {
      console.log("ver el error: ", error)
      return this.toastr.error(error.error.error)
    })
  }

}
