import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona';
import { Observable } from "rxjs";
import { SearchDTO } from './search-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private httpClient: HttpClient) { }

  getInfo(): Observable<Persona[]> {
    const token = localStorage.getItem('Token'); // Obtén el token del localStorage
    const idUser = localStorage.getItem('idUser');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Persona[]>(`https://localhost:7227/api/Person/GetPersons`, { headers });
  }

  getByName(filters: SearchDTO): Observable<Persona[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<Persona[]>(`https://localhost:7227/api/Person/GetPersonByFilter`, filters, { headers });
  }

  getByIdentification(filters: SearchDTO): Observable<Persona[]> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<Persona[]>(`https://localhost:7227/api/Person/GetPerson`, filters, { headers });
  }

  uploadCsv(file: File): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<any>(`https://localhost:7227/api/Person/CreatePersons`, formData, {
      headers: headers,
      responseType: 'text' as 'json',
      reportProgress: true,
      observe: 'events'
    });
  }
}
