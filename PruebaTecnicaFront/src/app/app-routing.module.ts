import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PersonaComponent } from './persona/persona.component';
import { SignupComponent } from './signup/signup.component';
import { InformationComponent } from './information/information.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'persona',
    component: PersonaComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'information',
    component: InformationComponent
  },
  {
    path: '',
    redirectTo: '/persona',
    pathMatch: 'full'
  },
  { path: 'information/:id', 
  component: InformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
