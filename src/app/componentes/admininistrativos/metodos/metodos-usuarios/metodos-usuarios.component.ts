import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-metodos-usuarios',
  standalone: false,
  templateUrl: './metodos-usuarios.component.html',
  styleUrl: './metodos-usuarios.component.css'
})
export class MetodosUsuariosComponent implements OnInit {

  constructor(
    public ventana: MatDialogRef<MetodosUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any
  ){}

  activar = false;
  ngOnInit(): void {
    this.activar = this.datos.activar;
    console.log('ver activar ', this.activar)
  }

  CerrarVentana(): void {
    this.ventana.close(false);
  }

  Confirmar(): void {
    this.ventana.close(true);
  }


}
