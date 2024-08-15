import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private baseUrl = 'http://localhost:5000'; // URL do seu backend Node.js

  constructor(private http: HttpClient) {}

  // Método para inscrever um e-mail
  subscribe(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscribe`, { email });
  }

  unsubscribe(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/unsubscribe`, { email });
  }
}
