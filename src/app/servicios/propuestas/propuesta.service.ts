import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotificarPropuestaComponent } from 'src/app/componentes/admininistrativos/director/notificar-propuesta/notificar-propuesta.component';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class PropuestaService {


  private apiUrl = `${environment.apiUrlBack}`
  constructor(
    private http: HttpClient,

  ) { }

  guardarPropuesta(
    tipo: string,
    tema: string,
    categoria: string,
    primerCorreo: string,
    archivo: File,
    segundoCorreo?: string,
    tercerCorreo?: string,
    idDocenteTutor?: number
  ) {
    console
    const formData = new FormData();
    console.log("ver tipo: ", tipo)
    formData.append('tipo', tipo);
    formData.append('tema', tema);
    console.log("ver categoria: ", categoria)

    formData.append('categoria', categoria);
    console.log("ver primerCorreo: ", primerCorreo)

    formData.append('primerCorreo', primerCorreo);
    formData.append('archivo', archivo);

    if (segundoCorreo) {
      formData.append('segundoCorreo', segundoCorreo);
    }
    if (tercerCorreo) {
      formData.append('tercerCorreo', tercerCorreo);
    }
    console.log("ver idDocenteTutor: ", idDocenteTutor)
    if (idDocenteTutor !== undefined && idDocenteTutor !== null) {
      formData.append('idDocenteTutor', idDocenteTutor.toString());
    }
    console.log("ver formData: ", formData,)
    return this.http.post(`${this.apiUrl}/propuestas`, formData, {
      responseType: 'text'
    });
  }




  // Validar Propuesta por direccion
  validarPropuesta(
    idPropuesta: number,
    respuesta: boolean,
    observaciones: string | null,
    idUsuarioSecretaria: number,
    taskID: string
  ): Observable<boolean> {
    let params = new HttpParams()
      .set('respuesta', respuesta)
      .set('idUsuarioSecretaria', idUsuarioSecretaria)
      .set('taskID', taskID);

    if (observaciones) {
      params = params.set('observaciones', observaciones);
    }

    return this.http.put<boolean>(
      `${this.apiUrl}/propuestas/${idPropuesta}/validar`,
      null, 
      { params: params }
    );
  }


  //asignar revisores por secretaria
  asignarRevisores(
    idPropuesta: number,
    idDocente1: number,
    idDocente2: number,
    rubrica: File,
    oficio: File,
    taskID: string
  ): Observable<boolean> {
    const formData = new FormData();

    formData.append('idDocente1', idDocente1.toString());
    formData.append('idDocente2', idDocente2.toString());
    formData.append('rubrica', rubrica);
    formData.append('oficio', oficio);
    formData.append('taskID', taskID);

    return this.http.put<boolean>(
      `${this.apiUrl}/propuestas/${idPropuesta}/asignarrevisores`,
      formData
    );
  }


  calificarPropuesta(idPropuesta: number, nota: number, observaciones: string | null, idDocente: number, rubrica: File, taskID: string) {
    const formData = new FormData();
    formData.append('nota', nota.toString().replace(',', '.'));
    formData.append('idDocente', idDocente.toString());
    formData.append('rubrica', rubrica);
    formData.append('taskID', taskID);
    if (observaciones) {
      formData.append('observaciones', observaciones);
    }
    return this.http.put<boolean>(`${this.apiUrl}/propuestas/${idPropuesta}/calificar`, formData);
  }

  aprobarPropuesta(
    idPropuesta: number,
    observaciones: string | null,
    idTutor: number,
    archivo: File,
    taskID: string
  ): Observable<boolean> {
    const formData = new FormData();
    if (observaciones) {
      formData.append('observaciones', observaciones);
    }
    formData.append('idTutor', idTutor.toString());
    formData.append('rubrica', archivo);
    formData.append('taskID', taskID);

    return this.http.put<boolean>(`${this.apiUrl}/propuestas/${idPropuesta}/aprobar`, formData);
  }


  negarPropuesta(
    idPropuesta: number,
    observaciones: string | null,
    taskID: string
  ): Observable<boolean> {
    const formData = new FormData();
    if (observaciones) {
      formData.append('observaciones', observaciones);
    }
    formData.append('taskID', taskID);

    return this.http.put<boolean>(`${this.apiUrl}/propuestas/${idPropuesta}/negar`, formData);
  }

  getPeriodos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/propuestas/periodos`);
  }

}
