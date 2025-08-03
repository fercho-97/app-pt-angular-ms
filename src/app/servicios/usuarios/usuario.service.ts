import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private apiUrl = `${environment.apiUrlBack}`

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router) {

  }

  activarDesactivarUsuario(id: number, accion: boolean): Observable<boolean> {
    const params = new HttpParams().set('accion', accion.toString());
    return this.http.put<any>(`${this.apiUrl}/usuarios/activardesactivar/${id}`, null, { params });
  }


  validarCorreo(token: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}/usuarios/validar`; 
    console.log("token......", token)
    const params = {
      token: token,
      password: password,
    };
    // Realiza la petición PUT
    return this.http.put<any>(url, null, { params });
  }

  recuperarCuenta(correo: string): Observable<boolean> {
    const params = new HttpParams().set('correo', correo);
    return this.http.post<boolean>(`${this.apiUrl}/usuarios//recuperar`, null, { params });
  }


  recuperarContrasena(password: string, token: string): Observable<boolean> {
    const params = new HttpParams()
      .set('password', password)
      .set('token', token);

    return this.http.put<boolean>(`${this.apiUrl}/usuarios//recuperarcontrasena`, null, { params });
  }

  actualizarContrasena(correo: string, oldPassword: string, newPassword: string): Observable<boolean> {
    const params = new HttpParams()
      .set('correo', correo)
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);

    return this.http.post<boolean>(`${this.apiUrl}/usuarios//actualizar`, null, { params });
  }


}
