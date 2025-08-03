import { Component } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  standalone: false,
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {

  userName: string = localStorage.getItem('nombreUsuario')!;
  userRole: string = localStorage.getItem('rol')!;

  mensajeRol = '';

  ngOnInit() {
    this.mensajeRol = this.getMensajePorRol();
  }

  getMensajePorRol(): string {
    switch (this.userRole) {
      case 'estudiante':
        return 'Puedes registrar y hacer seguimiento a tu propuesta.';
      case 'docente':
        return 'Revisa y tutoriza propuestas asignadas.';
      case 'coordinador':
        return 'Revisa y tutoriza propuestas asignadas.';
      case 'direccion':
        return 'Gestiona propuestas de tu facultad.';
      case 'ADMIN':
        return 'Gestiona carreras, y direcciones.';
      case 'secretaria':
        return 'Gestiona los revisores de las propuestas';
      default:
        return 'Bienvenido al sistema de titulación.';
    }
  }
}
