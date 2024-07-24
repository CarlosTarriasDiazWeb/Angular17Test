import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'shared-search-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  animations: [
    trigger('fadeInOut', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class SearchInputComponent {
  @ViewChild('searchBox', { static: false })
  public searchModalRef!: ElementRef<HTMLDivElement>;
  public searchBoxOpen: boolean = false;

  ngAfterViewInit(): void {
    this.searchModalRef.nativeElement.style.display = 'none';
  }

  public shoWSearchBox(): void {
    if (this.searchModalRef) {
      this.searchModalRef.nativeElement.style.display = 'flex';
      this.searchBoxOpen = true;
    }
  }

  public hideSearchBox(): void {
    if (this.searchModalRef) {
      this.searchModalRef.nativeElement.style.display = 'none';
      this.searchBoxOpen = false;
    }
  }
}
