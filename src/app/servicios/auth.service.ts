import { Injectable } from '@angular/core';    
//import { ILogin } from '../interfaces/login';    
    
@Injectable({    
   providedIn: 'root'    
})    
export class AuthService {    
   constructor() { }    
   logout() :void {    
   localStorage.setItem('isLoggedIn','false');    
   localStorage.removeItem('token');    
   localStorage.removeItem('empresa');
   localStorage.removeItem('perfil');
   localStorage.removeItem('establecimiento'); 
   localStorage.removeItem('nombre');            
   localStorage.removeItem('empresa_cod');            
   }    
} 