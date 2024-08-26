import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from './login-dto';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  post(form:LoginDTO): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>("https://localhost:7227/api/Login", form);
  }
}
