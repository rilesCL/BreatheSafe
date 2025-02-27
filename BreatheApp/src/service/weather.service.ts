import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
private apiKey = environment.stockApiKey;
private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=fr`;
    return this.http.get(url);
}
 }
