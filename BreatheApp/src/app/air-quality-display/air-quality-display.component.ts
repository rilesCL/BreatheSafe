import { Component, OnInit } from '@angular/core';
import { GeolocalisationService } from '../../service/geolocalisation.service';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-air-quality-display',
  standalone: true,
  imports: [
    CommonModule,
    NgClass
  ], 
  templateUrl: './air-quality-display.component.html',
  styleUrl: './air-quality-display.component.css'
})
export class AirQualityDisplayComponent {
city = 'Montréal';
country = 'CA';
coordinates: any;

constructor(
  private geolocalisationService: GeolocalisationService
) {}

ngOnInit() {
  this.geolocalisationService.getCoordinates(this.city, this.country).subscribe(
    (data: any) => {
      if (data.length > 0) {
        this.coordinates = data[0]; // Contient latitude et longitude
        console.log('Coordonnées récupérées :', this.coordinates);
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
