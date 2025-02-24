import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AirQualityDisplayComponent } from './air-quality-display/air-quality-display.component';
import { NgClass } from '@angular/common';
import { CitySearchComponent } from './city-search/city-search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AirQualityDisplayComponent,
    NgClass,
    CitySearchComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BreatheApp';
}
