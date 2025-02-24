import { Component, OnInit } from '@angular/core';
import { GeolocalisationService } from '../../service/geolocalisation.service';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { WeatherService } from '../../service/weather.service';
import { FormsModule } from '@angular/forms';




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
city = 'Montréal';
country = 'CA';
coordinates: any;
weather: any;

constructor(
  private geolocalisationService: GeolocalisationService,
  private weatherService: WeatherService
) {}

ngOnInit() {
  this.geolocalisationService.getCoordinates(this.city, this.country).subscribe(
    (data: any) => {
      if (data.length > 0) {
        this.coordinates = data[0]; // Contient latitude et longitude
        console.log('Coordonnées récupérées :', this.coordinates);

        //Appel à l'API météo apres recuperation des coordonnées
        this.weatherService.getWeather(this.coordinates.lat, this.coordinates.lon).subscribe(
          (weatherData:any) => {
            this.weather = weatherData;
            console.log('Données météo récupérées :', this.weather);
          },
          (error) => {
            console.error('Erreur lors de la récupération de la météo :', error);
          }
        );
      } else {
        console.log('Aucune donnée trouvée.');
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des coordonnées :', error);
    }
  );
}
}
