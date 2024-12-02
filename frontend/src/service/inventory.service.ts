import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private url= 'http://localhost:8080/api/v1/inventory';

  constructor(private http: HttpClient) {}

  addInventory(inventoryItem: {

    itemType: string;
    itemName: string;
    price: number;
    itemDescription: string;
    expireDate: null | Date;
    brand: string
  }): Observable<any> {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(`${this.url}`, inventoryItem,{headers});
  }


  getInventory(page: number): Observable<{ inventoryDTOS: any[]; dataCount: number }> {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }


    return this.http.get<any>(`${this.url}?page=${page}`,{headers}).pipe(
      map((response) => ({
        inventoryDTOS: response.data.inventoryDTOS,
        dataCount: response.data.dataCount
      }))
    );
  }
  searchInventory(params: any): Observable<any> {

    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    console.log(params);
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      console.log(key);

      if (Array.isArray(value)) {
        value.forEach((v) => (httpParams = httpParams.append(key, v)));
      } else if (value) {
        httpParams = httpParams.append(key, value);
      }
    });

    return this.http.get<any>(this.url+"/search",{ headers, params: httpParams });
  }


  deleteInventory(id: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<any>(`${this.url}/${id}`,{headers})
  }

  updateInventory(id:any,result:any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(`${this.url}/${id}`, result,{headers})

}
}
