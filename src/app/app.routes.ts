import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/todo-list/todo-list.routes').then((m) => m.TODO_ROUTES),
  },
];
