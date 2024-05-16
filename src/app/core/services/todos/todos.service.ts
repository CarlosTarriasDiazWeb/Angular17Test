import { Injectable, inject } from '@angular/core';
import { FetchService } from '../fetch/fetch.service';
import { Todo } from '../../models/todos';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private fetchService: FetchService) {}

  private todosSubject = new BehaviorSubject<Todo[]>([]);

  todos$ = this.todosSubject.asObservable();

  getAll(): Observable<Todo[]> {
    return this.fetchService
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap((todos) => this.todosSubject.next(todos)));
  }
}
