
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const url = environment.subsidioUrl + '/api/afiliado/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class UtilService {

  fecha: NgbDateStruct = {year: 2019, month: 1, day: 1};

  constructor(public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  cancelar(ruta): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([ruta])
    })
  }

  editar(ruta, id): void {
    this.router.navigateByUrl('dummy', { skipLocationChange: true }).then(() => {
      this.router.navigate([ruta], { queryParams: { id: id } })
    })
  }

  separarCadena(cadena, separador): any{
    return cadena.split(separador)
  }

  formatoFecha(fecha): NgbDateStruct{
      const fechaArr = this.separarCadena(fecha, '-');
      this.fecha.year = Number(fechaArr[0]);
      this.fecha.month = Number(fechaArr[1]);
      this.fecha.day =Number(fechaArr[2]);
    return fecha;
  }

  getUrlCargar() {
    return url + 'cargarplano';
  }

validarPlanoOld(file, cats): void {
  console.log(file);
  window.open(url + 'validar_plano?archivo=' + file + '&cats=' + JSON.stringify(cats) );
}

public validarPlano(file): Observable<any> {
  return this.http.post(url + 'validar_plano', JSON.stringify(file), httpOptions)
  .pipe(map(response => response as any));
}


}

