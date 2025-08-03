import { Component } from '@angular/core';
import { UsuarioCarreraComponent } from '../usuario-carrera/listar/usuario-carrera.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { CrearCarreraComponent } from '../crear-carrera/crear-carrera.component';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { CrearUsuarioDireccionComponent } from '../usuario-carrera/crear-usuario-direccion/crear-usuario-direccion.component';
import { AsignarCoordinadorComponent } from '../usuario-carrera/asignar-coordinador/asignar-coordinador.component';
@Component({
  selector: 'app-carrera',
  standalone: false,
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {

  constructor(
    public ventana: MatDialog,
    private toastr: ToastrService,
    public router: Router,
    public vistaS: VistasService
  ) {
  }
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>([]); // Propuesta es tu modelo

  ngOnInit() {
    this.ObtenerCarreras(1);
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();

    // Establecer el filtro en la propiedad filterPredicate de la fuente de datos
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.carrera.toLowerCase().includes(filter);
    };
    this.dataSource.filter = valor;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reinicia al primer paginado
    }
  }

  AbrirVentanaCrearCarrera() {
    this.ventana.open(CrearCarreraComponent, {
      width: '600px'
    })
      .afterClosed().subscribe(result => {
        this.ObtenerCarreras(1);
      })
  }


  carreras: any = [];
  ObtenerCarreras(id: any) {
    this.vistaS.obtenerCarrerasPorFacultad(id).subscribe(res => {
      console.log("ver carreras: ", res)
      if (res) {
        this.carreras = res;
        this.dataSource.data = this.carreras;
      } else {
        this.dataSource.data = [];
      }
    },
      error => {
        console.error('Error al obtener las propuestas', error);
      }
    );
  }

  // METODO PARA CONFIRMAR ELIMINACION MULTIPLE

  AbrirVentanaCrearDireccion(carrera) {
    this.ventana.open(CrearUsuarioDireccionComponent, {
      width: '600px', data: { carrera }
    })
      .afterClosed().subscribe(result => {
        this.ngOnInit();
      })
  }


  AbrirVentanaAsignarCoordinador(carrera) {
    this.ventana.open(AsignarCoordinadorComponent, {
      width: '600px', data: { carrera }
    })
      .afterClosed().subscribe(result => {
        this.ngOnInit();
      })
  }



}
