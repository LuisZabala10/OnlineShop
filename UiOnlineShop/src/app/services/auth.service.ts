import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private USER_NAME = 'UserName';
  private ISLOGIN = 'IsLogin';

  login(user:string){
    localStorage.setItem(this.USER_NAME,user);
    localStorage.setItem(this.ISLOGIN,'true');
  }

  logout(){

    localStorage.removeItem(this.USER_NAME);
    localStorage.removeItem(this.ISLOGIN);

    console.log('call');
  }

  getUserLogged(){
    return localStorage.getItem(this.USER_NAME);
  }

  isUserLogin(){
    const isLogged = localStorage.getItem(this.ISLOGIN)

    if(!isLogged){
      return false;
    }

    return true;
  }
}
