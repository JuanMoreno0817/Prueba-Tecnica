import { Component, ElementRef, ViewChild } from '@angular/core';
import { Persona } from '../persona/persona';
import { SignupService } from './signup.service';
import { AlertaService } from '../alerta/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  @ViewChild('documento') documento!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('cellphone') cellphone!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  constructor(private signup: SignupService, private alerta: AlertaService, private router: Router) { }

  crearPersonaFormulario() {
    let persona : Persona = {
      guid: null,
      identification: this.documento.nativeElement.value,
      name: this.name.nativeElement.value,
      email: this.email.nativeElement.value,
      phone: this.cellphone.nativeElement.value,
      password: this.password.nativeElement.value,
      userType: 1
    }
    if (persona) {
      this.signup.crearPersona(persona).subscribe({
        next: dato => {
          if (dato)
            this.alerta.showSuccess('Creación exitosa', 'Hecho');
          this.router.navigate(['login']);
        },
        error: error => {
          this.alerta.showError(error.error, 'Error');
        }
      });
    }
  }
}
