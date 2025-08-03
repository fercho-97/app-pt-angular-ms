import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './componentes/iniciarSesion/login/login.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './componentes/iniciarSesion/registro/registro.component';
import { FooterComponent } from './componentes/iniciarSesion/footer/footer.component';
import { PropuestaEstudianteComponent } from './componentes/estudiante/propuesta-estudiante/propuesta-estudiante.component';
import { MainNavComponent } from './componentes/main-nav/main-nav.component';
import { CrearPropuestaComponent } from './componentes/estudiante/crear-propuesta/crear-propuesta.component';
import { ActivarEstudianteComponent } from './componentes/admininistrativos/secretaria/activar-estudiante/activar-estudiante.component';
import { IngresarDocenteComponent } from './componentes/admininistrativos/secretaria/ingresar-docente/ingresar-docente.component';
import { MetodosUsuariosComponent } from './componentes/admininistrativos/metodos/metodos-usuarios/metodos-usuarios.component'; // Importar ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { ListarDocenteComponent } from './componentes/admininistrativos/secretaria/listar-docente/listar-docente.component';
import { VerificarCorreoComponent } from './componentes/iniciarSesion/verificar-correo/verificar-correo.component';
import { ListarPropuestaComponent } from './componentes/admininistrativos/director/listar-propuesta/listar-propuesta.component';
import { MostrarPropuestaComponent } from './componentes/admininistrativos/director/mostrar-propuesta/mostrar-propuesta.component';
import { MetodosPropuestasComponent } from './componentes/admininistrativos/metodos/metodos-propuestas/metodos-propuestas.component';
import { PasswordDocenteComponent } from './componentes/iniciarSesion/password-docente/password-docente.component';
import { ListarPropuestaPorAsignarComponent } from './componentes/admininistrativos/secretaria/listar-propuesta-por-asignar/listar-propuesta-por-asignar.component';
import { MetodosAsignarRevisoresComponent } from './componentes/admininistrativos/metodos/metodos-asignar-revisores/metodos-asignar-revisores.component';
import { ListarRevisionesComponent } from './componentes/docente/listar-revisiones/listar-revisiones.component';
import { CalificarPropuestaComponent } from './componentes/docente/calificar-propuesta/calificar-propuesta.component';
import { ListarPropuestasPorNotificarComponent } from './componentes/admininistrativos/director/listar-propuestas-por-notificar/listar-propuestas-por-notificar.component';
import { NotificarPropuestaComponent } from './componentes/admininistrativos/director/notificar-propuesta/notificar-propuesta.component';
import { SeguimientoProcesoComponent } from './componentes/estudiante/seguimiento-proceso/seguimiento-proceso.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CarreraComponent } from './componentes/admin/carrera/carrera.component';
import { UsuarioCarreraComponent } from './componentes/admin/usuario-carrera/listar/usuario-carrera.component';
import { CrearCarreraComponent } from './componentes/admin/crear-carrera/crear-carrera.component';
import { CrearUsuarioDireccionComponent } from './componentes/admin/usuario-carrera/crear-usuario-direccion/crear-usuario-direccion.component';
import { AsignarCoordinadorComponent } from './componentes/admin/usuario-carrera/asignar-coordinador/asignar-coordinador.component';
import { ListarSecretariasComponent } from './componentes/admin/secretaria/listar-secretarias/listar-secretarias.component';
import { CargarSecretariasComponent } from './componentes/admin/secretaria/cargar-secretarias/cargar-secretarias.component';
import { PropuestasComponent } from './componentes/propuestas/propuestas.component';
import { PropuestasAdminComponent } from './componentes/propuestas-admin/propuestas-admin.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { LoadingInterceptor } from './loading-interceptor.interceptor';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';
import { OlvidoContrasenaComponent } from './componentes/olvido-contrasena/olvido-contrasena.component';
import { RestaurarContrasenaComponent } from './componentes/restaurar-contrasena/restaurar-contrasena.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { ReportesGeneralComponent } from './componentes/reportes/reportes-general/reportes-general.component';
import { ReportesProcesosTerminadosComponent } from './componentes/reportes/reportes-procesos-terminados/reportes-procesos-terminados.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ReportesTutoriasClasificadosComponent } from './componentes/reportes/reportes-tutorias-clasificados/reportes-tutorias-clasificados.component';
import { ReportesProcesosClasificadosComponent } from './componentes/reportes/reportes-procesos-clasificados/reportes-procesos-clasificados.component';
import { ReportesTopRevisoresComponent } from './componentes/reportes/reportes-top-revisores/reportes-top-revisores.component';
import { PropuestasDeTutoresComponent } from './componentes/docente/propuestas-de-tutores/propuestas-de-tutores.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    PropuestaEstudianteComponent,
    MainNavComponent,
    CrearPropuestaComponent,
    ActivarEstudianteComponent,
    IngresarDocenteComponent,
    MetodosUsuariosComponent,
    ListarDocenteComponent,
    VerificarCorreoComponent,
    ListarPropuestaComponent,
    MostrarPropuestaComponent,
    MetodosPropuestasComponent,
    PasswordDocenteComponent,
    ListarPropuestaPorAsignarComponent,
    MetodosAsignarRevisoresComponent,
    ListarRevisionesComponent,
    CalificarPropuestaComponent,
    ListarPropuestasPorNotificarComponent,
    NotificarPropuestaComponent,
    SeguimientoProcesoComponent,
    CarreraComponent,
    UsuarioCarreraComponent,
    CrearCarreraComponent,
    CrearUsuarioDireccionComponent,
    AsignarCoordinadorComponent,
    ListarSecretariasComponent,
    CargarSecretariasComponent,
    PropuestasComponent,
    PropuestasAdminComponent,
    PerfilComponent,
    SpinnerComponent,
    CambiarContrasenaComponent,
    OlvidoContrasenaComponent,
    RestaurarContrasenaComponent,
    ReportesComponent,
    ReportesGeneralComponent,
    ReportesProcesosTerminadosComponent,
    ReportesTutoriasClasificadosComponent,
    ReportesProcesosClasificadosComponent,
    ReportesTopRevisoresComponent,
    PropuestasDeTutoresComponent,
    BienvenidaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgChartsModule
    
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
