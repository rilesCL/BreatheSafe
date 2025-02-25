import { Component, OnInit } from '@angular/core';
import { GeolocalisationService } from '../../service/geolocalisation.service';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { WeatherService } from '../../service/weather.service';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
import { AirQualityService } from '../../service/air-quality.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-air-quality-display',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule
  ], 
  templateUrl: './air-quality-display.component.html',
  styleUrl: './air-quality-display.component.css'
})
export class AirQualityDisplayComponent {
  city: string = '';
  country: string = '';
  lat: number = 0;
  lon: number = 0;
  weather: any;
  airQuality: any;
  isLoading: boolean = true;
  error: string = '';
  
  // Tableau pour interpréter l'indice de qualité de l'air
  aqiLabels = [
    { value: 1, label: 'Excellente', color: 'success' },
    { value: 2, label: 'Bonne', color: 'info' },
    { value: 3, label: 'Modérée', color: 'warning' },
    { value: 4, label: 'Mauvaise', color: 'danger' },
    { value: 5, label: 'Très mauvaise', color: 'danger' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private airQualityService: AirQualityService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.city = params['name'];
      
      this.route.queryParams.subscribe(queryParams => {
        this.lat = +queryParams['lat'];
        this.lon = +queryParams['lon'];
        this.country = queryParams['country'] || '';
        
        if (this.lat && this.lon) {
          this.loadData();
        } else {
          this.error = 'Coordonnées manquantes';
          this.isLoading = false;
        }
      });
    });
  }
  
  loadData() {
    this.isLoading = true;
    this.error = '';
    
    // Utiliser forkJoin pour faire les deux appels API en parallèle
    forkJoin({
      weather: this.weatherService.getWeather(this.lat, this.lon).pipe(
        catchError(err => {
          console.error('Erreur météo:', err);
          return of(null);
        })
      ),
      airQuality: this.airQualityService.getAirQuality(this.lat, this.lon).pipe(
        catchError(err => {
          console.error('Erreur qualité air:', err);
          return of(null);
        })
      )
    }).subscribe({
      next: (results) => {
        this.weather = results.weather;
        this.airQuality = results.airQuality;
        this.isLoading = false;
        
        if (!this.weather && !this.airQuality) {
          this.error = 'Impossible de récupérer les données pour cette localisation';
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données:', err);
        this.error = 'Une erreur est survenue lors du chargement des données';
        this.isLoading = false;
      }
    });
  }
  
  getAqiLabel(aqi: number) {
    const item = this.aqiLabels.find(item => item.value === aqi);
    return item ? item.label : 'Inconnue';
  }
  
  getAqiColor(aqi: number) {
    const item = this.aqiLabels.find(item => item.value === aqi);
    return item ? item.color : 'secondary';
  }
  
  retourRecherche() {
    this.router.navigate(['/']);
  }
}