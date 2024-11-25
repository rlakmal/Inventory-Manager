import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private url= 'http://localhost:8081/api/v1/inventory';

  constructor(private http: HttpClient) {}

  addInventory(inventoryItem: {
    itemType: string;
    itemName: string;
    price: number;
    itemDescription: string;
    expireDate: null | Date;
    brand: string
  }): Observable<any> {
    return this.http.post(`${this.url}`, inventoryItem);
  }

  getInventory(page: number): Observable<{ inventoryDTOS: any[]; dataCount: number }> {
    return this.http.get<any>(`${this.url}?page=${page}`).pipe(
      map((response) => ({
        inventoryDTOS: response.data.inventoryDTOS,
        dataCount: response.data.dataCount
      }))
    );
  }
  searchInventory(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        value.forEach((v) => (httpParams = httpParams.append(key, v)));
      } else if (value) {
        httpParams = httpParams.append(key, value);
      }
    });

    return this.http.get<any>(this.url, { params: httpParams });
  }



}
