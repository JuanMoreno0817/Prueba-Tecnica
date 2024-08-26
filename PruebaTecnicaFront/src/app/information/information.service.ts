import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from '../persona/persona';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private httpClient: HttpClient) { }

  putPersona(persona: Persona):Observable<Persona>{
    const token = localStorage.getItem('Token'); // Obtén el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<Persona>(`https://localhost:7227/api/Person/EditPerson `, persona, { headers });
  }

  deletePersona(id: number):Observable<string>{
    const token = localStorage.getItem('Token'); // Obtén el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<string>(`https://localhost:7227/api/Person/DeletePerson/${id}`, { headers });
  }
}
