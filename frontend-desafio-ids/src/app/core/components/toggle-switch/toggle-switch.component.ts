import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-toggle-switch',
  imports: [ReactiveFormsModule, FormsModule, ToggleSwitchModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent {
  @Input() label: string = '';
  @Input() frmName: string = '';
  @Input() frmGroup!: FormGroup;
}
