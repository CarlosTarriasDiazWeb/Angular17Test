import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FetchService } from '../fetch/fetch.service';
import { Pokemon } from '../../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor(private fetchService: FetchService) {}

  getAll(pokemonName: string): Observable<Pokemon> {
    return this.fetchService.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
  }
}
