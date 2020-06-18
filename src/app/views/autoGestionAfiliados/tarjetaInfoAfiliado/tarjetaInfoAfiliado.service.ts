import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observer } from '@syncfusion/ej2-base';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable(
  {providedIn: 'root'}
)

export class TarjetaAfiliado {
  private ruta: string;
  constructor(private httpClient: HttpClient) {
    this.ruta =  environment.baseUrl;
  }

  cargarAfiliados(idAfiliadoLogueado): Observable<any> {
    return this.httpClient.post(this.ruta + 'consultaAfiliados',
    JSON.stringify({ idAfiliadoLogueado: idAfiliadoLogueado }), httpOptions)
    .pipe(map((respuesta: Response) => {
      return respuesta;
    }));
  }

}
