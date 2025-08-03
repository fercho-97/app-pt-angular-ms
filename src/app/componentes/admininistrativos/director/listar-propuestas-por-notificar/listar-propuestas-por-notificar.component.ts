import { Component } from '@angular/core';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Propuesta } from 'src/app/models/propuesta';
import { DateTime } from "luxon";
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificarPropuestaComponent } from 'src/app/componentes/admininistrativos/director/notificar-propuesta/notificar-propuesta.component';

@Component({
  selector: 'app-listar-propuestas-por-notificar',
  standalone: false,
  templateUrl: './listar-propuestas-por-notificar.component.html',
  styleUrl: './listar-propuestas-por-notificar.component.css'
})
export class ListarPropuestasPorNotificarComponent {


  constructor(
    public flowableS: FlowableService,
    public vistasS: VistasService,
    public ventana: MatDialog, 

  ) {
  }

  ngOnInit() {
    this.ListarNoAprobados();
    this.buscarTareas();
  }

  desinacionTutorCount = 0;
  notificarRechazoCount = 0;
  buscarTareas() {
    this.flowableS.getTasksByAssignee(Number(localStorage.getItem('idUsuario'))).subscribe(res => {
      console.log("ver tareas del usuario: ", res)
      this.desinacionTutorCount = 0;
      this.notificarRechazoCount = 0;

      res.forEach(item => {
        if (item.name === 'Designación Tutor') {
          this.desinacionTutorCount++;
        }

        if (item.name === 'Notificar rechazo') {
          this.notificarRechazoCount++;
        }

      });

    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  propuestas: any = [];
  task: any = [];
  dataSource = new MatTableDataSource<Propuesta>([]); 
  lista_no_aprobados: boolean = true;
  lista_aprobados: boolean = false;
  tabla_aprobados: boolean = true;
  Hab_Deshabilitados: boolean = false;


  ListarNoAprobados() {
    setTimeout(() => {
      this.VerTask('notificarRechazo');
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });

    this.tabla_aprobados = false;
    this.lista_aprobados = true;
    this.lista_no_aprobados = false;
    this.Hab_Deshabilitados = true;


  }

  ListarAprobados() {
    setTimeout(() => {
      this.VerTask('generarActa');
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.tabla_aprobados = true;
    this.lista_aprobados = false;
    this.lista_no_aprobados = true;
    this.Hab_Deshabilitados = false;
  }

  VerTask(id: string) {
    const idUsuario = localStorage.getItem("idUsuario")!;

    this.flowableS.getTasksByAssigneeAndKey(idUsuario, id).subscribe(res => {
      if (res) {

        console.log("ver propuestas", res)
        const propuestaIds = res.map((task: any) => task.variables.propuestaId);
        console.log("ver ides de propuestas: ", propuestaIds)

        const observables = propuestaIds.map(id =>
          this.vistasS.getPropuestaById(id).pipe(
            catchError(err => {
              console.error(`Error al obtener propuesta con ID ${id}:`, err);
              return of(null); 
            })
          )
        );

        forkJoin(observables).subscribe({
          next: (dat) => {
            const data = dat as any[];

            this.propuestas = data
              .filter(propuesta => propuesta !== null) 
              .map((propuesta, index) => ({
                ...propuesta, 
                tareaId: res[index].id 
              }));
            this.propuestas.forEach(x =>  x.archivoEstudianteFecha = x.archivoEstudianteFecha.split(' ')[0])


            this.dataSource.data = this.propuestas;
            console.log('Propuestas con tareaId:', this.propuestas);
          },
          error: (err) => {
            console.error('Error al obtener las propuestas', err);
          }
        });
      } else {
        this.dataSource.data = [];
        console.log("no hay task pendientes")

      }


    }, error => {
      this.dataSource.data = [];
      console.log("no hay task pendientes")
    })
  }


  applyFilter(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Propuesta, filter: string) => {
      return data.tema.toLowerCase().includes(filter);
    };
    this.dataSource.filter = valor;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
  }

  AbrirVentanaNotificarPropuesta(propuesta: any, aprobar: boolean) {
    this.ventana.open(NotificarPropuestaComponent, {
      data: { propuesta: propuesta, aprobar: aprobar }, width: '600px'
    })
      .afterClosed().subscribe(result => {
        this.ngOnInit();
      })
  }


}
