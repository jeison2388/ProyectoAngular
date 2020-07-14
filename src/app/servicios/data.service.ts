import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';



const url = environment.baseUrl + '/common/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  public traerPersonas() {
    return this.http.get(url + 'personas')
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  public traerCombo(tabla) {
    return this.http.get(url + 'combos/' + tabla)
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  public contar(entidad) {
    return this.http.get(url + 'contar/' + entidad)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  public traerObjetoCodigo(entidad, valor) {
    return this.http.get(url + entidad + '/validac/' + valor)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  public traerObjetoId(entidad, valor) {
    return this.http.get(url + entidad + '/get/' + valor)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  traerObjeto(entidad, campos, infoCampos): Observable<Object[]> {
    return this.http.post(url + 'buscar_por_id/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: campos, infoCampos: infoCampos }),
      httpOptions)
      .pipe(map(response => response as Object[]));

  }


  public catalogoEntidadBasica(entidad, camposBusqueda, infoCampos): Observable<any> {
    return this.http.post(url + 'buscar/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: camposBusqueda, infoCampos: infoCampos }), httpOptions).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => {
          return data;
        }),
      );
  }

  public catalogoEntidadBasicaCombo(entidad, camposBusqueda, infoCampos, pag, max): Observable<any> {
    return this.http.post(url + 'buscar/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: camposBusqueda, infoCampos: infoCampos, page: pag, maxResults: max }), httpOptions).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => {
          let lista = [];
          for (let i = 0; i < data.length; i++) {
            lista.push({ value: data[i].id, label: data[i].descripcion });
          }
          return lista;
        }),
      );
  }

  public catalogoEntidadBasicaComboCodigo(entidad, camposBusqueda, infoCampos, pag, max): Observable<any> {
    return this.http.post(url + 'buscar/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: camposBusqueda, infoCampos: infoCampos, page: pag, maxResults: max }), httpOptions).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => {
          let lista = [];
          for (let i = 0; i < data.length; i++) {
            lista.push({ value: data[i].id, label: data[i].codigo });
          }
          return lista;
        }),
      );
  }

  public catalogoEntidadBasicaComboDescripcion(entidad, camposBusqueda, infoCampos, pag, max): Observable<any> {
    return this.http.post(url + 'buscar/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: camposBusqueda, infoCampos: infoCampos, page: pag, maxResults: max }), httpOptions).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => {
          let lista = [];
          for (let i = 0; i < data.length; i++) {
            lista.push({ value: data[i].id, label: data[i].descripcion });
          }
          return lista;
        }),
      );
  }

/**************************************
 * BUSCADOR CON DESCRIPCION COMBINADA *
 **************************************/
  public buscadorSelectCombinado(entidad, camposBusqueda, infoCampos, pag, max): Observable<any> {
    return this.http.post(url + 'buscar/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: camposBusqueda, infoCampos: infoCampos, page: pag, maxResults: max }), httpOptions).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => {
          let lista = [];
          for (let i = 0; i < data.length; i++) {
            lista.push({ value: data[i].id, label: data[i].codigo +' - '+ data[i].descripcion });
          }
          return lista;
        }),
      );
  }

  public entidadBasicaPaginada(entidad, camposBusqueda, infoCampos, pag, max): Observable<any> {
    return this.http.post(url + 'buscar/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: camposBusqueda, infoCampos: infoCampos, page: pag, maxResults: max }),
      httpOptions).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => {

          return data;

        }),
      );
  }


  public listaEntidadRelacion(entidad, entidadesRelacionadas, camposBusqueda, infoCampos, ) {
    return this.http.post(url + 'buscar_rel/',
      JSON.stringify({ nombreEntidad: entidad, entidadesRelacionadas: entidadesRelacionadas, camposBusqueda: camposBusqueda, infoCampos: infoCampos }), httpOptions)
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  public traerComboDep(tabla, llave, valor) {
    return this.http.get(url + 'combosdep/' + tabla + '/' + llave + '/' + valor)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  guardar(obj, entidad): Observable<Object[]> {
    return this.http
      .post(url + entidad + '/guardar/', JSON.stringify(obj), httpOptions)
      .pipe(map(response => response as Object[]));
  }

  guardarPorCampo(obj, entidad): Observable<Object[]> {
    return this.http
      .post(url + entidad + '/guardarPorCampo/', JSON.stringify(obj), httpOptions)
      .pipe(map(response => response as Object[]));
  }

  eliminarObjeto(entidad, id) {
    return this.http
      .delete(url + entidad + '/eliminar/' + id, httpOptions);
  }


  eliminarObjetocompuesto(id, pat) {
    return this.http
      .delete(url + 'eliminar_compuesto/' + id + '/' + pat, httpOptions);
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

  public listaEntidadRelacionPaginado(entidad, entidadesRelacionadas, camposBusqueda, infoCampos, pag, max ) {
    return this.http.post(url + 'buscar_rel/',
      JSON.stringify({ nombreEntidad: entidad, entidadesRelacionadas: entidadesRelacionadas, camposBusqueda: camposBusqueda, infoCampos: infoCampos, page: pag, maxResults: max }), httpOptions)
      .pipe(map((res: Response) => {
        return res;
      }));
  }


  public catalogoEntidadBasicaComboDescripcionUsuario(entidad, camposBusqueda, infoCampos, pag, max): Observable<any> {
    return this.http.post(url + 'buscar/',
      JSON.stringify({ nombreEntidad: entidad, camposBusqueda: camposBusqueda, infoCampos: infoCampos, page: pag, maxResults: max }), httpOptions).pipe(
        // Adapt each item in the raw data array
        map((data: any[]) => {
          const lista = [];
          for (let i = 0; i < data.length; i++) {
            lista.push({ value: data[i].id, label: data[i].nit + ' - ' + data[i].razonSocial });
          }
          return lista;
        }),
      );
  }

public validar(obj, entidad): Observable<any> {
    return this.http.post(url + entidad + '/validarPorCampo', JSON.stringify(obj), httpOptions)
    .pipe(map(response => response as any));
  }

}

