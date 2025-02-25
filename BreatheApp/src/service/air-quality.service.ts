import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {
  private apiKey = environment.stockApiKey;
  private airQualityUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';

  constructor(private http: HttpClient) {}

  getAirQuality(lat: number, lon: number): Observable<any> {
    const url = `${this.airQualityUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response && response.list && response.list.length > 0) {
          return response.list[0];
        }
        return null;
      })
    );
  }
}
