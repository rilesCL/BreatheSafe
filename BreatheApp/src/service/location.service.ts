import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private lat = new BehaviorSubject<number | null>(null);
  private lon = new BehaviorSubject<number | null>(null);

  constructor() { }

  lat$ = this.lat.asObservable();
  lon$ = this.lon.asObservable();

  setLocation(lat: number, lon: number): void {
    this.lat.next(lat);
    this.lon.next(lon);
  }
}
