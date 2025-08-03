import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearPropuestaComponent } from '../crear-propuesta/crear-propuesta.component';
import { PropuestaService } from 'src/app/servicios/propuestas/propuesta.service';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';
import { SeguimientoProcesoComponent } from '../seguimiento-proceso/seguimiento-proceso.component';
import { ArchivoService } from 'src/app/servicios/archivos/archivo.service';

@Component({
  selector: 'app-propuesta-estudiante',
  standalone: false,
  templateUrl: './propuesta-estudiante.component.html',
  styleUrl: './propuesta-estudiante.component.css'
})
export class PropuestaEstudianteComponent implements OnInit {


  idUsuario = 1;
  propuestas: any = [];
  editar_contrato: boolean = false

  constructor(
    public ventana: MatDialog, 
    private propuestaS: PropuestaService,
    public vistaS: VistasService,
    public archivosS: ArchivoService
  ) {
  }

  ngOnInit() {
    this.ObtenerPropuestas(Number(localStorage.getItem("idUsuario")));
  }

  AbrirArchivo(nombre: string) {
    this.archivosS.abrirArchivo(nombre).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: () => {
        alert("Error al abrir archivo.");
      }
    });
  }


  AbrirVentanaCrearPropuesta() {
    this.ventana.open(CrearPropuestaComponent, {
      width: '600px'
    })
      .afterClosed().subscribe(result => {
        this.ObtenerPropuestas(Number(localStorage.getItem("idUsuario")));
      })
  }

  ObtenerPropuestas(id: any) {
    this.vistaS.buscarPropuestaPorEstudiante(id).subscribe(res => {
      console.log("ver propuesta: ", res)
      res.forEach(x => x.archivoEstudianteFecha = x.archivoEstudianteFecha.split(' ')[0])
      this.propuestas = res;
    });

  }

  VerSeguimiento(propuesta: any) {
    this.ventana.open(SeguimientoProcesoComponent, {
      data: { propuesta },
    }).afterClosed()
      .subscribe((confirmado: Boolean) => {
      });
  }




}
