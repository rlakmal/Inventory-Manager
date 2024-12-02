import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) {
  }

  getUserDetails(): any {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get(this.apiUrl + "/details", {headers});
  }

  updateProfile(email: string, name: string, userId: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const params = new HttpParams()
      .set('email', email)
      .set('name', name)
      .set('userId', userId);

    return this.http.put(this.apiUrl, null, { headers, params });
  }

}
