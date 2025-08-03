import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VistasService {


  private apiUrl = `${environment.apiUrlBack}`

  constructor(
    private http: HttpClient,
  ) { }

  // Estudiantes
  BuscarUsuariosEstudiantes(estado: boolean) {
    return this.http.get<any>(`${this.apiUrl}/vistas/estudiantes/estado/${estado}`);
  }


  // Docentes
  buscarDocentesPorEstado(activo: boolean) {
    return this.http.get<any>(`${this.apiUrl}/vistas/docentes/estado/${activo}`)
  }

  buscarDocentePorIdUsuario(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vistas/docente/usuario/${idUsuario}`);
  }

  // Secreatria

  buscarSecretariaPorEstado(activo: boolean) {
    return this.http.get<any>(`${this.apiUrl}/vistas/secretarias/estado/${activo}`)
  }

  // Propuestas 

  getPropuestaById(idPropuesta: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vistas/propuestas/${idPropuesta}`);
  }

  buscarPropuestaPorEstudiante(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/vistas/propuestas/estudiante/usuario/${idUsuario}`;
    return this.http.get<any>(url);
  }

  buscarPropuestaPorCarrera(carrera: string): Observable<any> {
    const url = `${this.apiUrl}/vistas/propuestas/carrera?carrera=${encodeURIComponent(carrera)}`;
    return this.http.get<any>(url);
  }

  buscarPropuestaPorEstadoValidacion(
    numero: number,
    carrera: string
  ): Observable<any> {
    const url = `${this.apiUrl}/vistas/propuestas/validacion/${numero}`;
    const params = new HttpParams().set('carrera', carrera);
    return this.http.get<any[]>(url, { params });
  }

  buscarPropuestaPorEstadoAprobacion(
    numero: number,
    carrera: string
  ): Observable<any> {
    const url = `${this.apiUrl}/vistas/propuestas/aprobacion/${numero}`;
    const params = new HttpParams().set('carrera', carrera);
    return this.http.get<any[]>(url, { params });
  }

  getPropuestasPorTutor(idUsuario: number, facultad: string): Observable<any[]> {
    const params = new HttpParams().set('facultad', facultad);
    return this.http.get<any[]>(`${this.apiUrl}/vistas/propuestas/tutor/usuario/${idUsuario}`, { params });
  }

  getPropuestasPorTutorEstadoAprobacion(idUsuario: number, numero: number): Observable<any[]> {
    const url = `${this.apiUrl}/vistas/propuestas/tutor/usuario/${idUsuario}/aprobacion/${numero}`;
    return this.http.get<any[]>(url);
  }

  // Carreras
  obtenerCarrerasPorFacultadDisponibles(idFacultad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vistas/facultad/${idFacultad}/disponibles/carreras`);
  }

  obtenerCarrerasPorFacultad(idFacultad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vistas/facultad/${idFacultad}/carreras`);
  }

  // Usuario Rol
  obtenerUsuariosPorNombreRol(nombreRol: String, estado: String): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vistas/usuarioRol/rol/nombre/${nombreRol}`);
  }

  buscarUsuarioRolPorNombreRolYEstado(nombreRol: string, estado: boolean): Observable<any[]> {
    const url = `${this.apiUrl}/vistas/usuarioRol/rol/nombre/${nombreRol}/estado/${estado}`;
    return this.http.get<any[]>(url);
  }

}
