
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const url = environment.baseUrl + '/operaciones/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  constructor(private http: HttpClient) { }

  guardarProducto(obj): Observable<any> {
    return this.http.post(url + 'guardarProducto/', JSON.stringify(obj), httpOptions);
  }

  reasignarUsuario(id, usuario) {
    return this.http
      .put(url + 'reasignarUsuario/' + id + '/' + usuario, httpOptions);
  }


}

