import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-block.component.html',
  styleUrl: './mini-block.component.css'
})
export class MiniBlockComponent {

  @Input() paramName!: string;

}
