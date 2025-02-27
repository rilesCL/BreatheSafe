import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { AirQualityDisplayComponent } from './air-quality-display/air-quality-display.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: CitySearchComponent },
    { path: 'city', component: AirQualityDisplayComponent },
    // { path: 'city/name', component: AirQualityDisplayComponent },
    { path: '**', redirectTo: '' }
];
