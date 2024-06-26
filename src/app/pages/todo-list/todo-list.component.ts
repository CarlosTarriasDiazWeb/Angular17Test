import {
  Component,
  OnDestroy,
  OnInit,
  Pipe,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ThemePalette } from '@angular/material/core';
import { TodosService } from '../../core/services/todos/todos.service';
import { Todo } from '../../core/models/todos';
import { Subject, takeUntil } from 'rxjs';

import { CustomButtomComponent } from '../../shared/components/custom-buttom/custom-buttom.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CustomButtomComponent, MatPaginatorModule],
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

  todos = signal<Todo[]>([]);
  limit = signal<number>(10);

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
        this.todos.set(data);
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

    this.todosService.getAll(this.limit()).subscribe();
  }

  fetchData(event: any) {
    const selectedLimit = event.pageSize;
    this.limit.set(event.pageSize);
    // Llamar a getAll para inicializar los todos
    this.todosService.getAll(this.limit()).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showAlert() {
    alert('Hola Buenas!');
  }
}
