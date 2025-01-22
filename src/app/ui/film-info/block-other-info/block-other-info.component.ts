import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block-other-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-other-info.component.html',
  styleUrl: './block-other-info.component.css'
})
export class BlockOtherInfoComponent {

  @Input() Info!: string;
  
}
