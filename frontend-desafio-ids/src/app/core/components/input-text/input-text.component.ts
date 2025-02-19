import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export default class InputTextComponent {
  @Input() label: string = '';
  @Input() frmName: string = '';
  @Input() frmGroup!: FormGroup;
  @Input() maxlength: number = 255;
}
