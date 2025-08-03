import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { MostrarPropuestaComponent } from '../admininistrativos/director/mostrar-propuesta/mostrar-propuesta.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';
import { DateTime } from "luxon";

@Component({
  selector: 'app-propuestas',
  standalone: false,
  templateUrl: './propuestas.component.html',
  styleUrl: './propuestas.component.css'
})
export class PropuestasComponent {


  constructor(
    public ventana: MatDialog, 
    public router: Router, 
    public vistasS: VistasService
  ) {
  }


  ngOnInit() {
    this.ListarNoRevisadas();
  }

  ngAfterViewInit(): void {
    this.dataSource_nv.sort = this.sort;
    this.dataSource_nv.paginator = this.paginator;

  }


  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  @ViewChild('sort_nv') sort_nv!: MatSort;
  @ViewChild('paginator_nv') paginator_nv!: MatPaginator;


  dataSource_nv = new MatTableDataSource<any>([]); 

  VerPropuesta(propuesta: any) {
    this.ventana.open(MostrarPropuestaComponent, {
      width: 'auto',  
      height: 'auto', data: { propuesta }
    }).afterClosed()
      .subscribe((confirmado: Boolean) => {
      });
  }

  tabla_validado: boolean = false;
  tabla_no_validado: boolean = false;
  tabla_no_revisado: boolean = true;

  ListarNoRevisadas() {
    this.BuscarPropuestasPorEstado(1)
    this.tabla_validado = false;
    this.tabla_no_validado = false;
    this.tabla_no_revisado = true;
  }

  ListarAprobados() {
    this.BuscarPropuestasPorEstado(2)
    this.tabla_validado = true;
    this.tabla_no_validado = false;
    this.tabla_no_revisado = false;
  }

  ListarNoAprobados() {
    this.BuscarPropuestasPorEstado(0)
    this.tabla_validado = false;
    this.tabla_no_validado = true;
    this.tabla_no_revisado = false;
  }


  BuscarPropuestasPorEstado(estado: any) {

    this.vistasS.buscarPropuestaPorEstadoAprobacion(estado, localStorage.getItem("carrera")!).subscribe(res => {
      console.log("ver propuestas", res)
      res.forEach(x => x.archivoEstudianteFecha = x.archivoEstudianteFecha.split(' ')[0])

      this.dataSource_nv.data = res;
      setTimeout(() => {
        this.dataSource_nv.sort = this.sort_nv;
        this.dataSource_nv.paginator = this.paginator_nv;
      });

    }, error => {
      this.dataSource_nv.data = [];
      setTimeout(() => {
        this.dataSource_nv.sort = this.sort_nv;
        this.dataSource_nv.paginator = this.
          paginator_nv;
      });

      if (estado == 1) {
        console.log("no hay registros de no revisados")
      } else if (estado == 2) {
        console.log("no hay registros de validado")
      } else if (estado == 0) {
        console.log("no hay registros de no validad")
      }
    })

  }

  applyFilter_nr(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource_nv.filterPredicate = (data: any, filter: string) => {
      return data.tema.toLowerCase().includes(filter);
    };
    this.dataSource_nv.filter = valor;


    if (this.dataSource_nv.paginator) {
      this.dataSource_nv.paginator.firstPage(); 
    }
  }

}
