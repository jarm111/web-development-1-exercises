import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

// @Component is a decorator function that specifies the Angular metadata for the component,
// matches the name of the HTML element that identifies this component within a parent component's template
@Component({
  // selector— the component's CSS element selector
  selector: 'app-heroes',
  // the location of the component's template file
  templateUrl: './heroes.component.html',
  // the location of the component's private CSS styles
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  // The parameter simultaneously defines a private heroService property 
  // and identifies it as a HeroService injection site
  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    // asynchronous call, waits for the Observable to emit the array of heroes
    this.heroService.getHeroes()
    // subscribe passes the emitted array to the callback, which sets the component's heroes property
      .subscribe(heroes => this.heroes = heroes);
  }

  // lifecycle hook Angular calls ngOnInit shortly after creating a component. 
  // It's a good place to put initialization logic
  ngOnInit() {
    this.getHeroes();
  }

}
