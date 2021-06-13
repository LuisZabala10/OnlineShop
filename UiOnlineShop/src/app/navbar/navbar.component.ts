import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false;

  constructor(private auth : AuthService,private router:Router) { }

  ngOnInit(): void {
    this.logged = this.auth.isUserLogin();
  }

  logout(){
    this.auth.logout();

    this.router.navigate(['/ingresar']);
  }

}
