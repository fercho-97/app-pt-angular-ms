import { Component, OnInit } from '@angular/core';
import { DateTime } from "luxon";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MetodosPropuestasComponent } from '../../metodos/metodos-propuestas/metodos-propuestas.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import { MostrarPropuestaComponent } from '../mostrar-propuesta/mostrar-propuesta.component';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Propuesta } from 'src/app/models/propuesta';
import { MatSort } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-propuesta',
  standalone: false,
  templateUrl: './listar-propuesta.component.html',
  styleUrl: './listar-propuesta.component.css'
})
export class ListarPropuestaComponent {

  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  @ViewChild('sort_nv') sort_nv!: MatSort;
  @ViewChild('paginator_nv') paginator_nv!: MatPaginator;

  propuestas: any = [];
  task: any = [];
  dataSource = new MatTableDataSource<Propuesta>([]); 
  dataSource_nv = new MatTableDataSource<Propuesta>([]); 

  ngOnInit() {
    this.VerTask();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }


  constructor(

    public ventana: MatDialog, 
    private toastr: ToastrService,
    public router: Router, 
    public propuestaS: PropuestaService,
    public flowableS: FlowableService,
    public vistasS: VistasService
  ) {
  }
  cedulaEstudianteF = new FormControl('', Validators.minLength(2));


  public formulario = new FormGroup({
    cedulaForm: this.cedulaEstudianteF,
  })

  VerTask() {
    const idUsuario = localStorage.getItem("idUsuario")!;

    this.flowableS.getTasksByAssigneeAndKey(idUsuario, 'validacionTema').subscribe(res => {
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
        this.dataSource.data = [];
        console.log("no hay task pendientes")
      }
    }, error => {
      this.dataSource.data = [];
      console.log("no hay task pendientes")
    })
  }


  VerPropuesta(propuesta: any) {
    this.ventana.open(MostrarPropuestaComponent, {
      width: 'auto', 
      height: 'auto', data: { propuesta }
    }).afterClosed()
      .subscribe((confirmado: Boolean) => {
      });
  }

  ConfirmarValidar(propuesta: any, estado: boolean) {
    this.ventana.open(MetodosPropuestasComponent, { width: '450px', data: { validar: true, no_validar: false } }).afterClosed()
      .subscribe((result: { confirmado: Boolean, valor: Boolean, observacion: string, secretaria: number, taskID: string }) => {

        if (result.confirmado) {
          this.validar(propuesta, estado, result.observacion, result.secretaria, propuesta.tareaId);

        } else {
          this.router.navigate(['/listar-propuestas']);
        }
      });
  }



  ConfirmarNoValidar(propuesta: any, estado: boolean) {
    this.ventana.open(MetodosPropuestasComponent, { width: '450px', data: { validar: false, no_validar: true } }).afterClosed()
      .subscribe((result: { confirmado: Boolean, valor: Boolean, observacion: string, secretaria: number }) => {


        if (result.confirmado) {
          this.validar(propuesta, estado, result.observacion, result.secretaria, propuesta.tareaId);

        } else {
          this.router.navigate(['/listar-propuestas']);
        }
      });
  }


  validar(propuesta: any, valor: boolean, observacion: any, secretaria: any, idTask: string) {


    this.propuestaS.validarPropuesta(propuesta.id, valor, observacion, secretaria, idTask)
      .subscribe(
        (result) => {

          this.ListarNoRevisadas()
          this.flowableS.notificarActualizacion();
          this.toastr.success('Cambio de estado exitoso! ', '', {
            timeOut: 6000,
          })
        },
        (error) => {


          console.error('Error al enviar la propuesta', error);

          let errorMessage = 'Error desconocido';
          if (typeof error.error === 'string') {
            try {
              const parsed = JSON.parse(error.error);
              errorMessage = parsed.error || errorMessage;
            } catch (e) {
              errorMessage = error.error;
            }
          } else if (error.error && typeof error.error === 'object') {
            errorMessage = error.error.error || errorMessage;
          }
          return this.toastr.error(errorMessage)
        }
      );
  }

  tabla_validado: boolean = false;
  tabla_no_validado: boolean = false;
  tabla_no_revisado: boolean = true;


  ListarNoRevisadas() {
    setTimeout(() => {
      this.VerTask();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });


    this.tabla_validado = false;
    this.tabla_no_validado = false;
    this.tabla_no_revisado = true;
  }

  ListarValidadas() {
    this.BuscarPropuestasPorEstado(2)
    this.tabla_validado = true;
    this.tabla_no_validado = false;
    this.tabla_no_revisado = false;
  }

  ListarNoValidadas() {

    this.BuscarPropuestasPorEstado(0)

    this.tabla_validado = false;
    this.tabla_no_validado = true;
    this.tabla_no_revisado = false;
  }


  BuscarPropuestasPorEstado(estado: any) {

    this.vistasS.buscarPropuestaPorEstadoValidacion(estado, localStorage.getItem("carrera")!).subscribe(res => {
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
        this.dataSource_nv.paginator = this.paginator_nv;
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

  applyFilter_nr(filterValue: Event) {
    const valor = (filterValue.target as HTMLInputElement).value;
    this.dataSource_nv.filter = valor.trim().toLowerCase();

    if (this.dataSource_nv.paginator) {
      this.dataSource_nv.paginator.firstPage(); 
    }
  }

}


