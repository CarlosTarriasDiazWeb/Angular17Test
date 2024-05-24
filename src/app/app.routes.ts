import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/todo-list/todo-list.routes').then((m) => m.TODO_ROUTES),
  },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./pages/pokedex/pokedex.routes').then((m) => m.POKEDEX_ROUTES),
  },
];
