
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';



const url = environment.baseUrl+'/common/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TarifasService {

  constructor(private http: HttpClient) { }

  guardar(form): Observable<Object[]> {
    let obj = {
      identificacion: form.identificacion,
      nombres: form.nombres,
      apellidos: form.apellidos,
      nombreCompleto: form.nombres + ' ' + form.apellidos,
      direccion: form.direccion,
      telefono: form.telefono,
      correo: form.correo,
      idLocalidad: { id: form.localidad },
      idTipoIdentificacion: { id: form.tipo_identificacion },
    };
    return this.http
      .post(url + 'guardar/', JSON.stringify(obj), httpOptions)
      .pipe(map(response => response as Object[]));
  }

  editar(id, form): Observable<Object[]> {
    let obj = {
      id: id,
      identificacion: form.identificacion,
      nombres: form.nombres,
      apellidos: form.apellidos,
      nombreCompleto: form.nombres + ' ' + form.apellidos,
      direccion: form.direccion,
      telefono: form.telefono,
      correo: form.correo,
      idLocalidad: { id: form.localidad },
      idTipoIdentificacion: { id: form.tipo_identificacion },
    };
    return this.http
      .put(url + 'editar/', JSON.stringify(obj), httpOptions)
      .pipe(map(response => response as Object[]));
  }

}

