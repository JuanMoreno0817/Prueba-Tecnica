import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; 
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { AlertaService } from '../alerta/alerta.service';
import { LoginDTO } from './login-dto';
import { LoginResponse } from './login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private ApiService: LoginService, private fb: FormBuilder, private router: Router, private alerta: AlertaService) {
    this.loginForm = this.fb.group({
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    })
  }

  errorStatus: boolean = false;
  errorMsj: any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('Token')){
      this.router.navigate(['persona']);
    }
    else
    {
      this.router.navigate(['login']);
    }
  }

  onLogin(form: LoginDTO) {
    if (this.loginForm.valid) {
      console.log(this.loginForm)
      this.ApiService.post(form).subscribe(data => {
        let dataResponse: LoginResponse = data;
        if (dataResponse.status == "ok") {
          localStorage.setItem("Token", dataResponse.response);
          this.router.navigate(['persona']);
          this.alerta.showSuccess('Ingreso Éxitoso', 'Hecho');
          //window.location.reload();
        } else {
          this.errorMsj = dataResponse.response;
          this.alerta.showError(this.errorMsj,'Error');
        }
      });
    }
  }
}
