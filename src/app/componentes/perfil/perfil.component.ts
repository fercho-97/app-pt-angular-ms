import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  constructor(
    private router: Router,

  ) { }


  rol_usuario = localStorage.getItem('rol')?.toUpperCase();
  correo = localStorage.getItem('correo');
  facultad = localStorage.getItem('facultad');
  carrera = localStorage.getItem('carrera');
  nombreCompleto = localStorage.getItem('nombreUsuario');

  abrirDialogoCambio() {
    this.router.navigate(['/cambiar-contrasena']); 

  }
}
