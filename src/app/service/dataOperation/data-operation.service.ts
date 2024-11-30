import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataOperationService {

  constructor(private http: HttpClient) { }

  private api = environment.apiHostURL;


  cheackEmail(email: string): Observable<any> {
    return this.http.get(`${this.api}/cheack-email/${email}`)
  }

  getUserInfo(email: string): Observable<any> {
    return this.http.get(`${this.api}/user-info/${email}`)
  }

  getComentaries(filmId: string): Observable<any> {
    return this.http.get(`${this.api}/comentaries/${filmId}`)
  }

  sendData(data:any):Observable<any> {
    return this.http.post(`${this.api}/create`, data);
  }

  updateData(email: string, data:any): Observable<any> {
    return this.http.post(`${this.api}/${email}/films`, data)
  }

  sendComentaries(filmId: string, data: any): Observable<any> {
    return this.http.post(`${this.api}/${filmId}/comentar`, data)
  }
 

}
