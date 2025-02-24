import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { CitysearchService } from '../../service/citysearch.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css'
})
export class CitySearchComponent {
  query = '';
  cities: any[] = [];
    private searchTerms = new Subject<string>();
  
  constructor(
    private citySearchService: CitysearchService,
    private router : Router
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300), // Attendre 300ms après la dernière saisie
      distinctUntilChanged(), // Ignorer si même requête répétée
      switchMap((term: string) => this.citySearchService.searchCity(term))
    ).subscribe(cities => this.cities = cities);
  }

  trackByName(index: number, city: any): string {
    return city.name;
  }
  trackByCity(index: number, city: any): string {
    return city.name + city.lat + city.lon;
  }

  selectCity(city: any): void {
    this.router.navigate(['/city', city.name], { queryParams: { lat: city.lat, lon: city.lon } });
    console.log('Ville sélectionnée :', city);
  }
  
}
