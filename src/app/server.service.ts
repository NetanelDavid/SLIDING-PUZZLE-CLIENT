import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private client: HttpClient) { }

  getNewArray(size: number): Observable<{ arr: number[][] }> {
    return this.client.get<{ arr: number[][] }>(environment.baseUrl + 'new/' + size);
  }

  getSolution(arr: number[][]): Observable<{path: number[]}> {
    
    return this.client.post<{ path: number[] }>(environment.baseUrl + 'solution', { arr });
  }


}
