import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CitySearchComponent } from '../city-search/city-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CitySearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
