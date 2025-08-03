import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { CrearUsuarioDireccionComponent } from '../crear-usuario-direccion/crear-usuario-direccion.component';
import { MetodosUsuariosComponent } from 'src/app/componentes/admininistrativos/metodos/metodos-usuarios/metodos-usuarios.component';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';


@Component({
  selector: 'app-usuario-carrera',
  standalone: false,
  templateUrl: './usuario-carrera.component.html',
  styleUrl: './usuario-carrera.component.css'
})
export class UsuarioCarreraComponent {

  constructor(
    public ventana: MatDialog,
    private toastr: ToastrService,
    public router: Router,
    public vistaS: VistasService,
    public usuarioS: UsuarioService,

  ) {
  }
  @ViewChild('sort_nv') sort_nv!: MatSort;
  @ViewChild('paginator_nv') paginator_nv!: MatPaginator;
  dataSource_nv = new MatTableDataSource<any>([]); 

  ngOnInit() {
    this.ListarInactivos();
  }

  ngAfterViewInit(): void {
    this.dataSource_nv.sort = this.sort_nv;
    this.dataSource_nv.paginator = this.paginator_nv;
  }


  

  ObtenerUsuariosDireccion(estado: boolean) {
    
    this.vistaS.buscarUsuarioRolPorNombreRolYEstado('direccion', estado).subscribe(res => {
      console.log("ver direccion", res)

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


  applyFilter(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource_nv.filterPredicate = (data: any, filter: string) => {
      return data.carrera.toLowerCase().includes(filter);
    };
    this.dataSource_nv.filter = valor;

    if (this.dataSource_nv.paginator) {
      this.dataSource_nv.paginator.firstPage(); 
    }
  }


  // METODO PARA CONFIRMAR ELIMINACION MULTIPLE
  ConfirmarActiva(usuario: any, estado: boolean) {
    this.ventana.open(MetodosUsuariosComponent, { width: '450px', data: { activar: estado } }).afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.CambiarEstado(usuario, estado);
        } else {
          this.router.navigate(['/listar-usuarios-direccion']);
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

  Hab_Deshabilitados: boolean = false;
  lista_activos: boolean = false;
  tabla_activos: boolean = true;
  lista_inactivos: boolean = true;


  ListarInactivos() {
    this.ObtenerUsuariosDireccion(false)
    this.tabla_activos = false;
    this.lista_activos = true;
    this.lista_inactivos = false;
    this.Hab_Deshabilitados = true;
  }

  ListarActivos() {
    this.ObtenerUsuariosDireccion(true)
    this.tabla_activos = true;
    this.lista_activos = false;
    this.lista_inactivos = true;
    this.Hab_Deshabilitados = false;
  }





}
