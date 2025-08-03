import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints  } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FlowableService } from 'src/app/servicios/flowable/flowable.service';
@Component({
  selector: 'app-main-nav',
  standalone: false,
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {

  barraInicial = false;
  isExpanded = true;
  isShowing = false;
  rol_usuario = localStorage.getItem('rol');
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private flowableS: FlowableService

  ) { }

  nombreUsuario: string = '';

  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 800px)').subscribe((result: BreakpointState) => {
      this.barraInicial = result.matches;
    });

    this.flowableS.actualizarContador$.subscribe(() => {
      this.buscarTareas(); 
    });

    this.buscarTareas();
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';

  }

  validacionTemaCount = 0;
  designacionOrRechazoCount = 0;
  tareaIndividual = 0;

  buscarTareas() {
    this.flowableS.getTasksByAssignee(Number(localStorage.getItem('idUsuario'))).subscribe(res => {
      console.log("ver tareas del usuario: ", res)
      this.validacionTemaCount = 0;
      this.designacionOrRechazoCount = 0;
      this.tareaIndividual = 0;

      res.forEach(item => {
        if (item.name === 'Validación Tema') {
          this.validacionTemaCount++;
        }

        if (item.name === 'Designación Tutor' || item.name === 'Notificar rechazo') {
          this.designacionOrRechazoCount++;
        }

        if (item.name !== 'Validación Tema' || item.name !== 'Designación Tutor' || item.name !== 'Notificar rechazo') {
          this.tareaIndividual++;
        }


      });

    })
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('rol'); 
    sessionStorage.removeItem('id'); 
    localStorage.removeItem('idUsuario'); 
    localStorage.removeItem('correo'); 
    this.router.navigate(['/login']);
  }

  verPerfil() {
    this.router.navigate(['/perfil']); 
  }


}
