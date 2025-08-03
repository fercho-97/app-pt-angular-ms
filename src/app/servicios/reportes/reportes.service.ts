import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = `${environment.apiUrlMotor}`

  constructor(
    private http: HttpClient,
  ) { }


  


  getMetricas(
    nombreProceso: string,
    carrera: string,
    periodo: string,
    desde: string,
    hasta: string
  ): Observable<any> {

    let params = new HttpParams();


    console.log("ver carrera", carrera);
    console.log("ver periodo", periodo);
    console.log("ver desde", desde);
    console.log("ver hasta", hasta);


    if (carrera) {
      params = params.set('carrera', carrera);
    }

    if (periodo) {
      params = params.set('periodo', periodo);
    }

    if (desde) {
      params = params.set('desde', desde);
    }

    if (hasta) {
      params = params.set('hasta', hasta);
    }
    const url = `${this.apiUrl}/metrics/procesos/${nombreProceso}`;
    return this.http.get<any>(url, { params });


  }


  getMetricasPorRol(nombreProceso: string, params: {
    carrera?: string;
    periodo?: string;
    desde?: string; 
    hasta?: string; 
    rol: number;
  }): Observable<any> {
    let httpParams = new HttpParams().set('rol', params.rol.toString());

    if (params.carrera) {
      httpParams = httpParams.set('carrera', params.carrera);
    }
    if (params.periodo) {
      httpParams = httpParams.set('periodo', params.periodo);
    }
    if (params.desde) {
      httpParams = httpParams.set('desde', params.desde);
    }
    if (params.hasta) {
      httpParams = httpParams.set('hasta', params.hasta);
    }

    return this.http.get(`${this.apiUrl}/metrics/procesos/${nombreProceso}/roles`, { params: httpParams });
  }

  getTutoriasClasificadas(
    nombreProceso: string,
    carrera?: string,
    periodo?: string,
    desde?: string,
    hasta?: string
  ): Observable<any> {

    let params = new HttpParams();

    if (carrera) params = params.set('carrera', carrera);
    if (periodo) params = params.set('periodo', periodo);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);

    const url = `${this.apiUrl}/metrics/procesos/${nombreProceso}/tutorias-clasificadas`;

    return this.http.get<{ [tutor: string]: { [estado: string]: number } }>(url, { params });
  }

  getResumenProcesos(nombreProceso: string, carrera?: string, periodo?: string, desde?: string, hasta?: string): Observable<any> {
    let params = new HttpParams();

    if (carrera) params = params.set('carrera', carrera);

    if (periodo) params = params.set('periodo', periodo);

    if (desde) params = params.set('desde', desde);

    if (hasta) params = params.set('hasta', hasta);


    const url = `${this.apiUrl}/metrics/procesos/${nombreProceso}/resumen`;
    return this.http.get<any>(url, { params });
  }

  getRevisionesPorUsuario(
    nombreProceso: string,
    carrera?: string,
    periodo?: string,
    desde?: string,
    hasta?: string
  ): Observable<any> {
    let params = new HttpParams();

    if (carrera) params = params.set('carrera', carrera);
  
    if (periodo) params = params.set('periodo', periodo);
    
    if (desde) params = params.set('desde', desde);

    if (hasta) params = params.set('hasta', hasta);

    return this.http.get<any>(`${this.apiUrl}/metrics/procesos/${nombreProceso}/revisiones-por-usuario`, { params });
  }
}





