import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = []

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
    this.heroesServices.getHeroes()
      .subscribe(resp => {
        console.log(resp)
        this.heroes = resp;
      })
  }

}
