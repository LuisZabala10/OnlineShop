import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin : FormGroup;

  constructor(private auth: AuthService,private router : Router) { 
    this.formLogin = this.createFormGroup()
  }

  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
      user: new FormControl('',[Validators.required])
    });
  }

  onLogin(){
    const user = this.formLogin.get('user')?.value;

    this.auth.login(user);

    this.router.navigate(['/']);
  }

}
