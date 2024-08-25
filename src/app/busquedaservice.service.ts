import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaserviceService {
  private apiUrl = 'https://localhost:44335/api/BuscarInformacion';
  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?Busquedaparametro=${encodeURIComponent(query)}`);
  }
}
