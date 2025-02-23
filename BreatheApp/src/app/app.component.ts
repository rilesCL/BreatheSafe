import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AirQualityDisplayComponent } from './air-quality-display/air-quality-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AirQualityDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BreatheApp';
}
