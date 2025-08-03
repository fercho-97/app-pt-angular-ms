import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
    providedIn: 'root'
})

export class ArchivoService {

private apiUrl = `${environment.apiUrlBack}`


constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router) {

    }

    abrirArchivo(nombre: string): Observable<Blob> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get(`${this.apiUrl}/archivo/download`, { params, responseType: 'blob' });
}


}