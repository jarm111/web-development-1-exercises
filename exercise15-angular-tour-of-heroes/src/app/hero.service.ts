import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

// @Injectable() decorator marks the class as one that 
// participates in the dependency injection system
@Injectable({
  // At the root level, Angular creates a single, 
  // shared instance of the service 
  // and injects into any class that asks for it
  providedIn: 'root'
})

// Provides the heroes data
export class HeroService {
  // typical "service-in-service" scenario
  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // backticks define a JavaScript template literal
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
