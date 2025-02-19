import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';
import { CardComponent } from './card/card.component';
@Component({
  selector: 'app-home',
  imports: [CardComponent, CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
