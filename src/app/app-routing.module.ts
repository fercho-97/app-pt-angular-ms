import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/iniciarSesion/registro/registro.component';
import { LoginComponent } from './componentes/iniciarSesion/login/login.component';
import { PropuestaEstudianteComponent } from './componentes/estudiante/propuesta-estudiante/propuesta-estudiante.component';
import { ActivarEstudianteComponent } from './componentes/admininistrativos/secretaria/activar-estudiante/activar-estudiante.component';
import { ListarDocenteComponent } from './componentes/admininistrativos/secretaria/listar-docente/listar-docente.component';
import { VerificarCorreoComponent } from './componentes/iniciarSesion/verificar-correo/verificar-correo.component';
import { ListarPropuestaComponent } from './componentes/admininistrativos/director/listar-propuesta/listar-propuesta.component';
import { PasswordDocenteComponent } from './componentes/iniciarSesion/password-docente/password-docente.component';
import { ListarPropuestaPorAsignarComponent } from './componentes/admininistrativos/secretaria/listar-propuesta-por-asignar/listar-propuesta-por-asignar.component';
import { ListarRevisionesComponent } from './componentes/docente/listar-revisiones/listar-revisiones.component';
import { ListarPropuestasPorNotificarComponent } from './componentes/admininistrativos/director/listar-propuestas-por-notificar/listar-propuestas-por-notificar.component';
import { CarreraComponent } from './componentes/admin/carrera/carrera.component';
import { UsuarioCarreraComponent } from './componentes/admin/usuario-carrera/listar/usuario-carrera.component';
import { ListarSecretariasComponent } from './componentes/admin/secretaria/listar-secretarias/listar-secretarias.component';
import { PropuestasComponent } from './componentes/propuestas/propuestas.component';
import { PropuestasAdminComponent } from './componentes/propuestas-admin/propuestas-admin.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';
import { OlvidoContrasenaComponent } from './componentes/olvido-contrasena/olvido-contrasena.component';
import { RestaurarContrasenaComponent } from './componentes/restaurar-contrasena/restaurar-contrasena.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { ReportesGeneralComponent } from './componentes/reportes/reportes-general/reportes-general.component';
import { ReportesProcesosTerminadosComponent } from './componentes/reportes/reportes-procesos-terminados/reportes-procesos-terminados.component';
import { ReportesTutoriasClasificadosComponent } from './componentes/reportes/reportes-tutorias-clasificados/reportes-tutorias-clasificados.component';
import { ReportesProcesosClasificadosComponent } from './componentes/reportes/reportes-procesos-clasificados/reportes-procesos-clasificados.component';
import { ReportesTopRevisoresComponent } from './componentes/reportes/reportes-top-revisores/reportes-top-revisores.component';
import { PropuestasDeTutoresComponent } from './componentes/docente/propuestas-de-tutores/propuestas-de-tutores.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro-usuario', component: RegistroComponent },
  { path: 'vista-verificacion-correo/:token', component: VerificarCorreoComponent },
  { path: 'password-docente/:token', component: PasswordDocenteComponent },
  { path: 'ingreso-propuesta', component: PropuestaEstudianteComponent },
  { path: 'activar-usuarios', component: ActivarEstudianteComponent },
  { path: 'listar-docentes', component: ListarDocenteComponent },
  { path: 'listar-propuestas-por-asignar', component: ListarPropuestaPorAsignarComponent },
  { path: 'listar-propuestas', component: ListarPropuestaComponent },
  { path: 'listar-propuestas-por-notificar', component: ListarPropuestasPorNotificarComponent },
  { path: 'listar-revisiones', component: ListarRevisionesComponent },
  { path: 'listar-carreras', component: CarreraComponent },
  { path: 'listar-usuarios-direccion', component: UsuarioCarreraComponent },
  { path: 'listar-secretarias', component: ListarSecretariasComponent },
  { path: 'listar-propuestas-generales', component: PropuestasComponent },
  { path: 'listar-propuestas-admin', component: PropuestasAdminComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'cambiar-contrasena', component: CambiarContrasenaComponent },
  { path: 'olvidar-contrasenia', component: OlvidoContrasenaComponent },
  { path: 'restaurar-contrasenia/:token', component: RestaurarContrasenaComponent },
  { path: 'propuesta-de-tutor', component: PropuestasDeTutoresComponent },
  {
    path: 'reportes-direccion',
    component: ReportesComponent,
    children: [
      { path: 'reporte-general', component: ReportesGeneralComponent },
      { path: 'reporte-tutorias-clasificadas', component: ReportesTutoriasClasificadosComponent },
      { path: 'reporte-procesos-teminados', component: ReportesProcesosTerminadosComponent },
      { path: 'reporte-procesos-clasificados', component: ReportesProcesosClasificadosComponent },
      { path: 'reporte-top-revisores', component: ReportesTopRevisoresComponent },
      { path: '', redirectTo: 'reporte-procesos-teminados', pathMatch: 'full' }
    ]
  },
  { path: 'bienvenida', component: BienvenidaComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
