import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {
  private apiKey = environment.stockApiKey;
  private geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
  constructor(
    private http: HttpClient
  ) {}

  getCoordinates(city: string, country : string): Observable<any> {
    const url = `${this.geoUrl}?q=${city},${country}&limit=1&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
