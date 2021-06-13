import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsGuard implements CanActivate {
  constructor(private auth: AuthService, private router : Router){}

  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.auth.getUserLogged();
    const isLogged = this.auth.isUserLogin();
    
    if(!isLogged){
      return this.router.navigate(['/ingresar']);
    }
    if(currentUser == "Cliente" || currentUser == "Administrador"){
      return true;
    }else{
      return this.router.navigate(['/sin-acceso']);
    }
  }
  
}
