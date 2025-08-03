import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarreraRequest } from 'src/app/models/carrera-request';
import { RegistroRequest } from 'src/app/models/registro-request.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

    private apiUrl = `${environment.apiUrlBack}`

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router) { }

  registrarCarrera(carrera: CarreraRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/carreras/registro`, carrera);
  }

  registrarUsuarioCarrera(data: RegistroRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/carreras/registrousuario`, data);
  }

  registrarAutoridad(idCarrera: number, idUsuario: number): Observable<boolean> {
    const url = `${this.apiUrl}/carreras/${idCarrera}/autoridades/${idUsuario}`;
    return this.http.put<boolean>(url, null); 
  }

}
