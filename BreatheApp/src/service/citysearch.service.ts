import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitysearchService {
private apiKey = environment.stockApiKey;
private cityUrl = 'http://api.openweathermap.org/geo/1.0/direct';
  constructor(
    private http: HttpClient
  ){}
  searchCity(query: string): Observable<any> {
    if (!query.trim()) return new Observable(); // Évite les requêtes vides
    const url = `${this.cityUrl}?q=${query}&limit=10&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}

