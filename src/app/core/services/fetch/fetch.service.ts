import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor() {}

  httpClient = inject(HttpClient);

  get<T>(
    url: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      params?: HttpParams | { [param: string]: string | string[] };
      observe?: 'body';
      responseType?: 'json';
    }
  ): Observable<T> {
    return this.httpClient.get<T>(url, options);
  }
}
