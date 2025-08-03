import { Component, OnInit, Inject,AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';
import panzoom from 'panzoom';

@Component({
  selector: 'app-seguimiento-proceso',
  standalone: false,
  templateUrl: './seguimiento-proceso.component.html',
  styleUrl: './seguimiento-proceso.component.css'
})
export class SeguimientoProcesoComponent {

  @ViewChild('zoomArea') zoomArea!: ElementRef;

   ngAfterViewInit(): void {
    panzoom(this.zoomArea.nativeElement);
  }

  constructor(
    private ventana_: MatDialogRef<SeguimientoProcesoComponent>,
    private procesoService: FlowableService,

    @Inject(MAT_DIALOG_DATA) public datos: any
  ) { }

  imageUrl : string | null = null;

  verpropuesta: any = {}
  ngOnInit(): void {
    console.log("ver datos Propuesta: ", this.datos.propuesta);
    this.procesoService.obtenerProcesoActivo(this.datos.propuesta.id).subscribe(data => {
      console.log("verproceso activo ", data);

      this.procesoService.obtenerImagen(data)
        .subscribe(blob => {
          console.log("ver base 64  ", data);


          const reader = new FileReader();
          reader.onload = () => {
            this.imageUrl = reader.result as string;
          };
          reader.readAsDataURL(blob);
        });
    });
  }


  // METODO PARA CERRAR VENTANA DE REGISTRO
  CerrarRegistro() {
    this.ventana_.close();
  }



}
