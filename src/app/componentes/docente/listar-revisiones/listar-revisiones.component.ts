import { Component } from '@angular/core';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Propuesta } from 'src/app/models/propuesta';
import { DateTime } from "luxon";
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CalificarPropuestaComponent } from '../calificar-propuesta/calificar-propuesta.component';

@Component({
  selector: 'app-listar-revisiones',
  standalone: false,
  templateUrl: './listar-revisiones.component.html',
  styleUrl: './listar-revisiones.component.css'
})
export class ListarRevisionesComponent {

  constructor(
    public flowableS: FlowableService,
    public vistasS: VistasService,
    public ventana: MatDialog, 

  ) {
  }

  ngOnInit() {
    this.VerTask();
  }


  propuestas: any = [];
  dataSource = new MatTableDataSource<Propuesta>([]); 

  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }



  VerTask() {
    const idUsuario = Number(localStorage.getItem("idUsuario"));

    this.flowableS.getTasksByAssignee(idUsuario).subscribe(res => {
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
            this.propuestas.forEach(x => x.archivoEstudianteFecha = x.archivoEstudianteFecha.split(' ')[0])

            this.dataSource.data = this.propuestas;
            console.log('Propuestas con tareaId:', this.propuestas);
          },
          error: (err) => {
            console.error('Error al obtener las propuestas', err);
          }
        });
      } else {
        this.dataSource.data = []
        console.log("no hay task pendientes")

      }
    }, error => {
      this.dataSource.data = []
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

AbrirVentanaCalificarPropuesta(propuesta: any,) {
    this.ventana.open(CalificarPropuestaComponent, {
      data: { propuesta }, width: '600px'
    })
      .afterClosed().subscribe(result => {
        this.VerTask();

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        });
      })
  }

}
