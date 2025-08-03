import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArchivoService } from 'src/app/servicios/archivos/archivo.service';

@Component({
  selector: 'app-mostrar-propuesta',
  standalone: false,
  templateUrl: './mostrar-propuesta.component.html',
  styleUrl: './mostrar-propuesta.component.css'
})
export class MostrarPropuestaComponent implements OnInit {

  constructor(
    private ventana_: MatDialogRef<MostrarPropuestaComponent>,
    public archivos: ArchivoService,
    @Inject(MAT_DIALOG_DATA) public datos: any
  ) { }


  verpropuesta: any = {}
  ngOnInit(): void {
    console.log("ver datos Propuesta: ", this.datos.propuesta);
    this.verpropuesta = this.datos.propuesta
  }

  CerrarRegistro() {
    this.ventana_.close();
  }


  AbrirArchivo(nombre: string) {
    this.archivos.abrirArchivo(nombre).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: () => {
        alert("Error al abrir archivo.");
      }
    });
  }

}
