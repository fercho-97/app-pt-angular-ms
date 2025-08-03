import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistroRequest } from 'src/app/models/registro-request.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiUrlBack}`

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router) { }


  // VALIDACIONES DE INGRESO AL SISTEMA 
  ValidarCredenciales(data: any): Observable<any> {

    console.log(this.apiUrl);
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  registroUsuario(request: any): Observable<boolean> {
    console.log("ver data registro:", request )
    return this.http.post<boolean>(`${this.apiUrl}/auth/registro`, request);
  }




}


