import { Component } from '@angular/core';
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
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { first } from 'rxjs';
import { InputDateComponent } from '../../core/components/input-date/input-date.component';
import { InputTextMaskComponent } from '../../core/components/input-text-mask/input-text-mask.component';
import InputTextComponent from '../../core/components/input-text/input-text.component';
import { ToastService } from '../../core/services/toast/toast.service';
import {
  ERRO_CAMPOS_OBRIGATORIOS,
  SUCESSO_AO_SALVAR,
} from '../../shared/consts/msgs';
import { FornecedoresEdicaoService } from './fornecedores-edicao.service';

@Component({
  selector: 'app-fornecedores-edicao',
  imports: [
    InputTextComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ToolbarModule,
    RouterLink,
    CardModule,
    InputDateComponent,
    SelectButtonModule,
    InputTextMaskComponent,
  ],
  templateUrl: './fornecedores-edicao.component.html',
  styleUrl: './fornecedores-edicao.component.scss',
})
export class FornecedoresEdicaoComponent {
  formGroup: FormGroup;
  idFornecedores: number = 0;

  options = [
    { label: 'Ativo', value: 'Ativo' },
    { label: 'Baixado', value: 'Baixado' },
    { label: 'Suspenso', value: 'Suspenso' },
  ];

  constructor(
    private fb: FormBuilder,
    private fornecedoresEdicaoService: FornecedoresEdicaoService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.formGroup = this.fb.group({
      idFornecedores: [null],
      codigo: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      email: [''],
      telefone: ['', Validators.required],
      cnpj: [null, Validators.required],
      situacao: ['Ativo'],
      dataBaixa: [null],
    });
    this.formGroup.controls['dataBaixa'].disable();

    this.idFornecedores = +(
      this.activatedRoute.snapshot.paramMap.get('id') || 0
    );
  }

  ngOnInit() {
    if (this.idFornecedores) {
      this.edit();
    }
  }

  onSalvar() {
    if (this.formGroup.invalid) {
      this.toastService.showError(ERRO_CAMPOS_OBRIGATORIOS);
      return;
    }
    const obj = {
      ...this.formGroup.value,
      dataBaixa: this.formGroup.controls['dataBaixa'].value,
      cnpj: this.formGroup.controls['cnpj'].value.replace(/\D/g, ''),
      telefone: this.formGroup.controls['telefone'].value.replace(/\D/g, ''),
    };
    this.fornecedoresEdicaoService
      .salvar(obj)
      .pipe(first())
      .subscribe(() => {
        this.toastService.showSuccess(SUCESSO_AO_SALVAR);
        this.router.navigate(['/fornecedores-gerenciamento']);
      });
  }

  edit() {
    this.fornecedoresEdicaoService
      .findById(this.idFornecedores)
      .pipe(first())
      .subscribe((result) => {
        this.formGroup.patchValue(result);
        if (this.formGroup.controls['situacao'].value !== 'Baixado') {
          this.formGroup.controls['dataBaixa'].disable();
        } else {
          this.formGroup.controls['dataBaixa'].enable();
          this.formGroup.controls['dataBaixa'].setValue(
            new Date(result.dataBaixa),
          );
        }
      });
  }

  onChangeSituacao() {
    if (this.formGroup.controls['situacao'].value !== 'Baixado') {
      this.formGroup.controls['dataBaixa'].setValue(null);
      this.formGroup.controls['dataBaixa'].disable();
    } else {
      this.formGroup.controls['dataBaixa'].enable();
    }
  }
}
