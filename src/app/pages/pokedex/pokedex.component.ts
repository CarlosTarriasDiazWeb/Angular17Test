import { Component, Signal, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../core/models/pokemon';
import { PokedexService } from '../../core/services/pokedex/pokedex.service';
import { first } from 'rxjs';
import { SearchInputComponent } from "../../shared/components/search-input/search-input.component";
@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButton,
    SearchInputComponent
],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
})
export class PokedexComponent {
  myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  pokemon = signal<Pokemon | null>(null);

  constructor(
    private formBuilder: FormBuilder,
    private pokedexService: PokedexService
  ) {}

  fetchPokemon() {
    this.pokedexService
      .getAll(this.myForm.get('name')?.value)
      .pipe(first())
      .subscribe((pokemon: Pokemon) => {
        this.pokemon.set(pokemon);
      });
  }
}
