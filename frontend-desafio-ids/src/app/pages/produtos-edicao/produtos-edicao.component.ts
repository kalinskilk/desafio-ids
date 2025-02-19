import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { first } from 'rxjs';
import InputTextComponent from '../../core/components/input-text/input-text.component';
import { ToggleSwitchComponent } from '../../core/components/toggle-switch/toggle-switch.component';
import { ToastService } from '../../core/services/toast/toast.service';
import {
  ERRO_CAMPOS_OBRIGATORIOS,
  SUCESSO_AO_SALVAR,
} from '../../shared/consts/msgs';
import { ProdutosEdicaoService } from './produtos-edicao.service';

@Component({
  selector: 'app-produtos-edicao',
  imports: [
    InputTextComponent,
    ReactiveFormsModule,
    FormsModule,
    ToggleSwitchComponent,
    ButtonModule,
    ToolbarModule,
    RouterLink,
    CardModule,
  ],
  providers: [ToastService],
  templateUrl: './produtos-edicao.component.html',
  styleUrl: './produtos-edicao.component.scss',
})
export class ProdutosEdicaoComponent implements OnInit {
  formGroup: FormGroup;
  idProdutos: number = 0;
  constructor(
    private fb: FormBuilder,
    private produtosEdicaoService: ProdutosEdicaoService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.formGroup = this.fb.group({
      idProdutos: [null],
      descricao: ['', Validators.required],
      codigo: ['', Validators.required],
      situacao: [true],
    });

    this.idProdutos = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit() {
    if (this.idProdutos) {
      this.edit();
    }
  }

  onSalvar() {
    if (this.formGroup.invalid) {
      this.toastService.showError(ERRO_CAMPOS_OBRIGATORIOS);
      return;
    }
    this.produtosEdicaoService
      .salvar(this.formGroup.value)
      .pipe(first())
      .subscribe(() => {
        this.toastService.showSuccess(SUCESSO_AO_SALVAR);
        this.router.navigate(['/produtos-gerenciamento']);
      });
  }

  edit() {
    this.produtosEdicaoService
      .findById(this.idProdutos)
      .pipe(first())
      .subscribe((result) => {
        this.formGroup.patchValue(result);
      });
  }
}
