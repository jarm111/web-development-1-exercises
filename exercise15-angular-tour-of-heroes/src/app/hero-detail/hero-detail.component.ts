import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  // The hero property must be an Input property, 
  // annotated with the @Input() decorator, 
  // because the external HeroesComponent will bind to it
  @Input() hero: Hero;

  constructor(
    // ActivatedRoute holds information about the route to this instance of the HeroDetailComponent
    private route: ActivatedRoute,
    private heroService: HeroService,
    // location is an Angular service for interacting with the browser
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // route.snapshot is a static image of the route information
    // paramMap is a dictionary of route parameter values extracted from the URL
    // JavaScript (+) operator converts the string to a number,
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    //navigates backward one step in the browser's history stack
    this.location.back();
  }
}
