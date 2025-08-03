import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MetodosUsuariosComponent } from '../../metodos/metodos-usuarios/metodos-usuarios.component';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { DateTime } from "luxon";
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VistaEstudiante } from 'src/app/models/vista-estudiante.model';
@Component({
  selector: 'app-activar-estudiante',
  standalone: false,
  templateUrl: './activar-estudiante.component.html',
  styleUrl: './activar-estudiante.component.css'
})
export class ActivarEstudianteComponent implements OnInit {


  @ViewChild('sort_nv') sort_nv!: MatSort;
  @ViewChild('paginator_nv') paginator_nv!: MatPaginator;
  dataSource_nv = new MatTableDataSource<VistaEstudiante>([]); 


  ngOnInit() {
    this.ListarInactivos()
  }


  ngAfterViewInit(): void {
    this.dataSource_nv.sort = this.sort_nv;
    this.dataSource_nv.paginator = this.paginator_nv;
  }

  constructor(

    public ventana: MatDialog, 
    private toastr: ToastrService,
    public router: Router, 
    public usuarioS: UsuarioService,
    public vistaS: VistasService

  ) {
  }
  cedulaEstudianteF = new FormControl('', Validators.minLength(2));


  public formulario = new FormGroup({
    cedulaForm: this.cedulaEstudianteF,
  })


  ConfirmarActiva(usuario: any, estado: boolean) {
    this.ventana.open(MetodosUsuariosComponent, { width: '450px', data: { activar: estado } }).afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.CambiarEstado(usuario, estado);
        } else {
          this.router.navigate(['/activar-usuarios']);
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
    this.BuscarUsuariosPorEstado(false)
    this.tabla_activos = false;
    this.lista_activos = true;
    this.lista_inactivos = false;
    this.Hab_Deshabilitados = true;
  }

  // METODO PARA MOSTRAR LISTA DE USUARIOS ACTIVOS
  ListarActivos() {
    this.BuscarUsuariosPorEstado(true)
    this.tabla_activos = true;
    this.lista_activos = false;
    this.lista_inactivos = true;
    this.Hab_Deshabilitados = false;
  }

  BuscarUsuariosPorEstado(estado: boolean) {
    this.vistaS.BuscarUsuariosEstudiantes(estado).subscribe(res => {
      console.log("ver estudiantes", res)
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

  applyFilter(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource_nv.filterPredicate = (data: VistaEstudiante, filter: string) => {
      return data.apellidos.toLowerCase().includes(filter);
    };
    this.dataSource_nv.filter = valor;

    if (this.dataSource_nv.paginator) {
      this.dataSource_nv.paginator.firstPage(); 
    }
  }


}
