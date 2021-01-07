import { TripDetailsComponent } from './features/trip-details/trip-details.component';
import { AddTripComponent } from './features/add-trip/add-trip.component';
import { TripsListComponent } from './features/trips-list/trips-list.component';
import { RegisterComponent } from './features/register/register.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { LoginComponent } from './features/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tripsList',
    component: TripsListComponent
  },
  {
    path: 'addTrip',
    component: AddTripComponent
  },
  {
    path: 'tripDetails',
    component: TripDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
