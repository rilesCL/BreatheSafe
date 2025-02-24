import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CitySearchComponent } from './city-search/city-search.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: CitySearchComponent },
    { path: 'city/name', component: CitySearchComponent },
    { path: '**', redirectTo: '' }
];
