import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

// Routes tell the router which view to display when a user clicks a link 
// or pastes a URL into the browser address bar
// path: a string that matches the URL in the browser address bar
// component: the component that the router should create when navigating to this route
const routes: Routes = [
  // default route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // a parameterized route
  // colon in the path indicates that :id is a placeholder for a specific hero
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  // Add RouterModule to the @NgModule.imports array and configure it with the routes in one step
  // forRoot() method supplies the service providers and directives needed for routing, 
  // and performs the initial navigation based on the current browser URL
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

// An Angular best practice is to load and configure the router in a separate, 
// top-level module that is dedicated to routing and imported by the root AppModule
export class AppRoutingModule { }
