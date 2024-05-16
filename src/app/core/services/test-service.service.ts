import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  // Definimos un signal para el nombre del usuario
  number = signal(0);

  constructor() {}

  // Método para actualizar el nombre del usuario
  updateNumber(value: number) {
    this.number.set(value);
  }
}
