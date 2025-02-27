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
  isLoading = false;
  
  constructor(
    private citySearchService: CitysearchService,
    private router : Router
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        this.isLoading = true;
        return this.citySearchService.searchCity(term);
      })
    ).subscribe({
      next: cities => {
        this.cities = cities;
        this.isLoading = false;
      },
      error: err => {
        console.error('Erreur lors de la recherche', err);
        this.isLoading = false;
      }
    });
  }
  
  selectCity(city: any): void {
    // On navigue vers la page de détail avec les coordonnées en paramètres
    this.router.navigate(['/city'], { 
      queryParams: { 
        city: city.name,
        lat: city.lat, 
        lon: city.lon,
        country: city.country 
      } 
    });
    console.log('Ville sélectionnée :', city);
  }


  trackByName(index: number, city: any): string {
    return city.name;
  }
  trackByCity(index: number, city: any): string {
    return city.name + city.lat + city.lon;
  }
}
