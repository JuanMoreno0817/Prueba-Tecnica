import { Injectable } from '@angular/core';
import { Persona } from '../persona/persona';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  crearPersona(persona: Persona):Observable<Persona>{
    return this.httpClient.post<Persona>(`https://localhost:7227/api/Person/CreatePerson`, persona)
  }
}
