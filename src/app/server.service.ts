import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { newArray, solution } from "./oldService";

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  constructor(private client: HttpClient) { }

  getNewArray(size: number): Observable<number[][]> {
    return of(newArray(size));
  }

  getSolution(arr: number[][]): Observable<number[]> {
    const newArr = JSON.parse(JSON.stringify(arr))
    return of(JSON.parse(JSON.stringify(solution(newArr))));
  }
}
