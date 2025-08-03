import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class FlowableService {

  private apiUrl = `${environment.apiUrlMotor}`



  constructor(
    private http: HttpClient,
  ) { }

  getTasksByAssignee(assigneeId: number): Observable<any> {
    const url = `${this.apiUrl}/process/tasks?assignee=${assigneeId}`;
    return this.http.get<any>(url);
  }


  getTasksByAssigneeAndKey(assignee: string, taskKey: string): Observable<any> {
    const params = new HttpParams()
      .set('assignee', assignee)
      .set('taskKey', taskKey);

    return this.http.get<any>(`${this.apiUrl}/process/tasks/by-assignee-and-key`, { params });
  }



  obtenerImagen(processInstanceId: string): Observable<Blob> {
    const url = `${this.apiUrl}/process/image/${processInstanceId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  obtenerProcesoActivo(propuestaId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/process/activo/${propuestaId}`, { responseType: 'text' });
  }

  private actualizarContadorSubject = new Subject<void>();
  actualizarContador$ = this.actualizarContadorSubject.asObservable();

  notificarActualizacion() {
    this.actualizarContadorSubject.next();
  }

}
