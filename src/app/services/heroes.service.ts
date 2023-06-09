import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://login-angular-f73cc-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    }

    delete heroeTemp.id
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroe(id:any ) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
      .pipe(
        map(resp => {
          return resp;
        })
      )
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map( this.getArray )
      )
  }

  deleteHeroe(id: any) {
    console.log('serv')
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  //convierto el OBJ en array
  private getArray(heroesObj:any) {
    const heroes: HeroeModel[] = [];

    console.log(heroesObj)

    if (heroesObj === null) {
      return [];
    }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe)
    })


    return heroes
  }
}
