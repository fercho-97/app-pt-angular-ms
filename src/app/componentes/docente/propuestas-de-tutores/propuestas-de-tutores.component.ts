import { Component } from '@angular/core';
import { DateTime } from "luxon";
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { MostrarPropuestaComponent } from '../../admininistrativos/director/mostrar-propuesta/mostrar-propuesta.component';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Propuesta } from 'src/app/models/propuesta';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-propuestas-de-tutores',
  standalone: false,
  templateUrl: './propuestas-de-tutores.component.html',
  styleUrl: './propuestas-de-tutores.component.css'
})
export class PropuestasDeTutoresComponent {


  constructor(
    public ventana: MatDialog, 
    private toastr: ToastrService,
    public router: Router,
    public vistasS: VistasService
    
  ) {
  }
  @ViewChild('sort_nv') sort_nv!: MatSort;
  @ViewChild('paginator_nv') paginator_nv!: MatPaginator;
  dataSource_nv = new MatTableDataSource<Propuesta>([]); // Propuesta es tu modelo


  ngOnInit() {
    this.BuscarPropuestasPorTutor();
  }
  VerPropuesta(propuesta: any) {
    this.ventana.open(MostrarPropuestaComponent, {
      width: 'auto',  
      height: 'auto', data: { propuesta }
    }).afterClosed()
      .subscribe((confirmado: Boolean) => {
      });
  }

  BuscarPropuestasPorTutor() {

    this.vistasS.getPropuestasPorTutorEstadoAprobacion(Number(localStorage.getItem('idUsuario')!), 2).subscribe(res => {
      console.log("ver propuestas", res)
      res.forEach(x =>  x.archivoEstudianteFecha = x.archivoEstudianteFecha.split(' ')[0])

      this.dataSource_nv.data = res;
      setTimeout(() => {
        this.dataSource_nv.sort = this.sort_nv;
        this.dataSource_nv.paginator = this.paginator_nv;
      });

    }, error => {
      this.dataSource_nv.data = [];
      setTimeout(() => {
        this.dataSource_nv.sort = this.sort_nv;
        this.dataSource_nv.paginator = this.paginator_nv;
      });
    })

  }

  applyFilter(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource_nv.filterPredicate = (data: Propuesta, filter: string) => {
      return data.tema.toLowerCase().includes(filter);
    };
    this.dataSource_nv.filter = valor;

    if (this.dataSource_nv.paginator) {
      this.dataSource_nv.paginator.firstPage(); 
    }
  }






}
