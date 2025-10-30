
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '../../../auth/auth-components/services/storage/storage';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class Admin {
  constructor (private http: HttpClient){}

  postCar(carDto:any):Observable<any>{
    return this.http.post(BASIC_URL+"/api/admin/car",carDto, {
    headers:this.createAuthoricationHeader()
    });
  }

  createAuthoricationHeader(): HttpHeaders{
    let authHeaders : HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + Storage.getToken()
    );
  }
}
