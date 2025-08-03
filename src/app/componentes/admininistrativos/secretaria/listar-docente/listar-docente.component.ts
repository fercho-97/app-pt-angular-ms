import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MetodosUsuariosComponent } from '../../metodos/metodos-usuarios/metodos-usuarios.component';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { DateTime } from "luxon";
import { ActivatedRoute, Router } from '@angular/router';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { IngresarDocenteComponent } from '../ingresar-docente/ingresar-docente.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { VistaDocente } from 'src/app/models/vista-docente.model';

@Component({
  selector: 'app-listar-docente',
  standalone: false,
  templateUrl: './listar-docente.component.html',
  styleUrl: './listar-docente.component.css'
})
export class ListarDocenteComponent {

  @ViewChild('sort_nv') sort_nv!: MatSort;
  @ViewChild('paginator_nv') paginator_nv!: MatPaginator;
  dataSource_nv = new MatTableDataSource<VistaDocente>([]);

  ngOnInit() {
    this.ListarInactivos();

  }


  ngAfterViewInit(): void {
    this.dataSource_nv.sort = this.sort_nv;
    this.dataSource_nv.paginator = this.paginator_nv;
  }



  constructor(
    private route: ActivatedRoute,
    public ventana: MatDialog, 
    private toastr: ToastrService,
    public router: Router, 
    public usuarioS: UsuarioService,
    public vistaS: VistasService

  ) {
  }


  Hab_Deshabilitados: boolean = false;
  lista_activos: boolean = false;
  tabla_activos: boolean = true;
  lista_inactivos: boolean = true;


  ListarInactivos() {
    this.BuscarUsuariosPorEstado(false)
    this.tabla_activos = false;
    this.lista_activos = true;
    this.lista_inactivos = false;
    this.Hab_Deshabilitados = true;
  }

  ListarActivos() {
    this.BuscarUsuariosPorEstado(true)
    this.tabla_activos = true;
    this.lista_activos = false;
    this.lista_inactivos = true;
    this.Hab_Deshabilitados = false;
  }


  // METODO PARA CONFIRMAR ELIMINACION MULTIPLE
  ConfirmarActiva(usuario: any, estado: boolean) {
    this.ventana.open(MetodosUsuariosComponent, { width: '450px', data: { activar: estado } }).afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.CambiarEstado(usuario, estado);
        } else {
          this.router.navigate(['/listar-docentes']);
        }
      });
  }


  CambiarEstado(usuario: any, estado: boolean) {
    this.usuarioS.activarDesactivarUsuario(usuario.idUsuario, estado).subscribe((res: any) => {
      this.toastr.success('Cambio de estado Existoso! ' + usuario.nombres + ' ' + usuario.apellidos, '', {
        timeOut: 6000,
      })
      this.ListarInactivos()

    }, error => {
      this.toastr.error('No se ha podido cambiar el estado de' + usuario.nombres + ' ' + usuario.apellidos, '', {
        timeOut: 6000,
      });
      this.ListarInactivos()
    });
  }

  BuscarUsuariosPorEstado(estado: boolean) {
    this.vistaS.buscarDocentesPorEstado(estado).subscribe(res => {
      console.log("ver docentes", res)
      res.forEach(x => x.fechaCreacion = DateTime.fromISO(x.fechaCreacion).toFormat("dd-MM-yy"))

      this.dataSource_nv.data = res
      setTimeout(() => {
        this.dataSource_nv.sort = this.sort_nv;
        this.dataSource_nv.paginator = this.paginator_nv;
      });
    }, error => {
      this.dataSource_nv.data = []
      setTimeout(() => {
        this.dataSource_nv.sort = this.sort_nv;
        this.dataSource_nv.paginator = this.paginator_nv;
      });

      if (estado == true) {
        console.log("no hay registros de activos")
      } else {
        console.log("no hay registros de inactivos")
      }
    })
  }

  AbrirVentanaCrearDocente() {
    this.ventana.open(IngresarDocenteComponent, { width: '600px' })
      .afterClosed().subscribe(result => {
        this.ngOnInit();
      })
  }


  applyFilter(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource_nv.filterPredicate = (data: VistaDocente, filter: string) => {
      return data.apellidos.toLowerCase().includes(filter);
    };
    this.dataSource_nv.filter = valor;

    if (this.dataSource_nv.paginator) {
      this.dataSource_nv.paginator.firstPage(); 
    }
  }

}
