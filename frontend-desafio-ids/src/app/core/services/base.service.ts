import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBaseService } from '../../shared/interfaces/base.interface';

const headers = new HttpHeaders({});

export abstract class BaseService implements IBaseService {
  private url = 'http://localhost:8080';

  constructor(public http: HttpClient) {}

  public getUrl(): string {
    return this.url;
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.url}${endpoint}`, { headers, params });
  }

  post<T>(endpoint: string, body?: T): Observable<any> {
    return this.http.post<T>(`${this.url}${endpoint}`, body, { headers });
  }

  delete<T>(endpoint: string): Observable<any> {
    return this.http.delete<T>(`${this.url}${endpoint}`, { headers });
  }

  put<T>(endpoint: string, body: T): Observable<any> {
    return this.http.put<T>(`${this.url}${endpoint}`, body, { headers });
  }
}
