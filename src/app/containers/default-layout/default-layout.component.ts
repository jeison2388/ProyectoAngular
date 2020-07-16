import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems, NavData } from '../../_nav';
import { SeguridadService } from '../../servicios/seguridad.service';
import { DataService } from '../../servicios/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  public recursos: any[] = [];
  public hijos: NavData[] = [];
  public item: NavData;
  public navItemsLocal: NavData[] = [];
  public navItemsHijos;
  id: string;
  nombre: string;
  empresa: string;
  usuario: string;
  perfil: string;
  tipo_usuario_descripcion: string;

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    public seguridadService: SeguridadService, 
    public dataService: DataService, 
    private router: Router, private authService: AuthService,
    @Inject(DOCUMENT) _document?: any) {



    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  ngOnInit() {
   
    this.id = localStorage.getItem('token');  
    this.nombre = localStorage.getItem('nombre');
    this.empresa = localStorage.getItem('empresa');
    this.usuario = localStorage.getItem('id_usuario');
    this.perfil = localStorage.getItem('id_perfil');
    this.tipo_usuario_descripcion = localStorage.getItem('perfil');

    this.seguridadService.traerHijos1(this.perfil, this.usuario)
      .subscribe((data: any) => {
        this.navItemsLocal = navItems;
        localStorage.setItem('recursos', data);
      },
        error => {
          console.log('There was an error while retrieving data !!!' + error);
        });
  }


  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  } 




}
