import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService{
  private url= 'http://localhost:8083/api/v1/user/register';

  constructor(private http: HttpClient) { }

  register(user: { email: string; username: string; name: string; password: string;rePassword: string }): Observable<any> {
    return this.http.post(`${this.url}`, user);
  }
}
