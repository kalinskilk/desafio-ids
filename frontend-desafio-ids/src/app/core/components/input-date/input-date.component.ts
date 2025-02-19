import { Component, Input, LOCALE_ID } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-input-date',
  imports: [DatePickerModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
})
export class InputDateComponent {
  @Input() label: string = '';
  @Input() frmName: string = '';
  @Input() frmGroup!: FormGroup;
}
