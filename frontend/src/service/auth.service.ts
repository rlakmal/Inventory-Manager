import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/user/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  storeToken(accessToken: any) {
    console.log(accessToken);
    localStorage.setItem('accessToken', accessToken);

  }
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  logout(): void {
    localStorage.removeItem('accessToken');
  }

}
