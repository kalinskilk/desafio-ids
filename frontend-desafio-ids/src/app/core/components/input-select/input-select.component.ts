import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-input-select',
  imports: [SelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
})
export class InputSelectComponent {
  @Input() label: string = '';
  @Input() frmName: string = '';
  @Input() frmGroup!: FormGroup;

  @Input() options: { label: string; value: number }[] = [];

  optionLabel = 'label';
  optionValue = 'value';
}
