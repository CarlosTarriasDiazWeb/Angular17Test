import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
type ButtonModes = 'material' | 'prime';
@Component({
  selector: 'app-custom-buttom',
  standalone: true,
  imports: [MatButton, ButtonModule],
  templateUrl: './custom-buttom.component.html',
  styleUrl: './custom-buttom.component.scss',
})
export class CustomButtomComponent {
  @Input() type!: ButtonModes;
  @Output() handleClick = new EventEmitter();
}
