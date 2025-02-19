import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-input-text-mask',
  imports: [InputMaskModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-text-mask.component.html',
  styleUrl: './input-text-mask.component.scss',
})
export class InputTextMaskComponent {
  @Input() label: string = '';
  @Input() frmName: string = '';
  @Input() frmGroup!: FormGroup;
  @Input() mask: string = '';
}
