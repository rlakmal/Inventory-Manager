import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService{
  private apiUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) {}


  forgotPassword(username: string): Observable<any> {
    return this.http.post(this.apiUrl+"/forgot-password", { username });

  }

  validateOtp(otp: string): Observable<any> {
    return this.http.post(this.apiUrl+"/validate-otp", {otp});
  }

  changePassword(user: { password: string; rePassword: string; username: string }):Observable<any> {
    console.log(user);
    return this.http.post(`${this.apiUrl}`+"/change-password",user);

  }
}
