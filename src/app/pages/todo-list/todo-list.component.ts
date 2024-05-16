import { Component, OnDestroy, OnInit, Pipe, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { TodosService } from '../../core/services/todos/todos.service';
import { Todo } from '../../core/models/todos';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  title = 'my-app';
  control: number = 0;
  color: ThemePalette = 'primary';
  checked: boolean = false;
  disabled: boolean = false;
  numberValue: number = 0;

  private destroy$ = new Subject<void>();

  todos: Todo[] = [];

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    // this.todosService
    //   .getAll()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (data: Todo[]) => {
    //       this.todos = data;
    //     },
    //     error: (err) => {
    //       // Maneja el error aquí
    //       console.error('Error occurred:', err);
    //     },
    //     complete: () => {
    //       // Maneja la finalización del observable aquí
    //       console.log('Request completed');
    //     },
    //   });

    this.todosService.todos$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Todo[]) => {
        this.todos = data;
      },
      error: (err) => {
        // Maneja el error aquí
        console.error('Error occurred:', err);
      },
      complete: () => {
        // Maneja la finalización del observable aquí
        console.log('Request completed');
      },
    });

    // Llamar a getAll para inicializar los todos
    this.todosService.getAll().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
