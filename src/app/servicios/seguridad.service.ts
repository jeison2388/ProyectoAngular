
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';



const url = environment.accesoUrl + '/seguridad/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
     reportProgress: 'true',
     observe: 'events'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: HttpClient) { }

  public traerMenus(perfil) {
    return this.http.get(url + 'menus/' + perfil )
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  public traerHijos(perfil, padre)  {
    return this.http.get(url + 'hijos/' + perfil + '/' + padre  )
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  public traerHijos1(perfil, padre)  {
    return this.http.get(url + 'hijos1/' + perfil + '/' + padre  )
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  login(login, clave): Observable<Object> {
    return this.http.post(url + 'login/',
      JSON.stringify({ usuario: login, clave: clave }),
      httpOptions)
      .pipe(map(response => response as Object));

  }


  actualizar(obj): Observable<Object[]> {
    return this.http
      .post(url + 'actualizar/', JSON.stringify(obj), httpOptions)
      .pipe(map(response => response as Object[]));
  }


  validarRuta(perfil, ruta){
    return this.http.get(url + 'rutas/' + perfil + '/' + ruta  )
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  guardarUsuario(obj): Observable<any> {
    return this.http.post(url + 'guardarUsuario', JSON.stringify(obj), httpOptions);
  }

}

