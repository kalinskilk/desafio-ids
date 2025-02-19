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
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { first, forkJoin } from 'rxjs';
import { InputCurrencyComponent } from '../../core/components/input-currency/input-currency.component';
import { InputDateComponent } from '../../core/components/input-date/input-date.component';
import { InputSelectComponent } from '../../core/components/input-select/input-select.component';
import InputTextComponent from '../../core/components/input-text/input-text.component';
import { ToastService } from '../../core/services/toast/toast.service';
import {
  ERRO_CAMPOS_OBRIGATORIOS,
  SUCESSO_AO_SALVAR,
} from '../../shared/consts/msgs';
import FornecedoresDTO from '../../types/fornecedores-dto';
import NotasFiscaisCreateDto, {
  ItemNotasFiscaisCreateDTO,
} from '../../types/notas-fiscais-create-dto';
import ProdutosDto from '../../types/produtos-dto';
import { FornecedoresGerenciamentoService } from '../fornecedores-gerenciamento/fornecedores-gerenciamento.service';
import { ProdutosGerenciamentoService } from '../produtos-gerenciamento/produtos-gerenciamento.service';
import { NotasFiscaisEdicaoService } from './notas-fiscais-edicao.service';
import { TableItensComponent } from './table-itens/table-itens.component';

@Component({
  selector: 'app-notas-fiscais-edicao',
  imports: [
    InputTextComponent,
    ReactiveFormsModule,
    FormsModule,

    ButtonModule,
    ToolbarModule,
    RouterLink,
    CardModule,
    InputCurrencyComponent,
    InputDateComponent,
    InputSelectComponent,
    TableItensComponent,
    DividerModule,
  ],
  templateUrl: './notas-fiscais-edicao.component.html',
  styleUrl: './notas-fiscais-edicao.component.scss',
})
export class NotasFiscaisEdicaoComponent {
  formGroup: FormGroup;
  idNotasFiscais: number = 0;

  listFornecedores: { label: string; value: number }[] = [];
  listProdutos: { label: string; value: number }[] = [];
  itens: ItemNotasFiscaisCreateDTO[] = [];
  constructor(
    private fb: FormBuilder,
    private notasFiscaisEdicaoService: NotasFiscaisEdicaoService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fornecedoresGerenciamentoService: FornecedoresGerenciamentoService,
    private produtosGerenciamentoService: ProdutosGerenciamentoService,
  ) {
    this.formGroup = this.fb.group({
      idNotasFiscais: [null],
      numeroNota: ['', Validators.required],
      dataEmissao: [new Date(), Validators.required],
      valorTotal: [0, Validators.required],
      idFornecedor: [null, Validators.required],
    });

    this.idNotasFiscais = +(
      this.activatedRoute.snapshot.paramMap.get('id') || 0
    );
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    const fornecedores =
      this.fornecedoresGerenciamentoService.listFornecedores('Ativo');
    const produtos = this.produtosGerenciamentoService.listProdutos('', true);
    const arrSubs = !this.idNotasFiscais
      ? [fornecedores, produtos]
      : [
          fornecedores,
          produtos,
          this.notasFiscaisEdicaoService.findById(this.idNotasFiscais),
        ];

    forkJoin(arrSubs)
      .pipe(first())
      .subscribe(([dataFornecedores, dataProdutos, notaFiscal]) => {
        this.listFornecedores = (dataFornecedores as FornecedoresDTO[]).map(
          (el) => {
            return { label: el.razaoSocial, value: el.idFornecedores };
          },
        );
        this.listProdutos = (dataProdutos as ProdutosDto[]).map((el) => {
          return { label: el.descricao, value: el.idProdutos };
        });

        if (this.idNotasFiscais) {
          const nota = notaFiscal as NotasFiscaisCreateDto;

          this.itens = nota.itens;
          this.formGroup.patchValue(nota);

          this.formGroup.controls['dataEmissao'].setValue(
            new Date(`${nota.dataEmissao} 00:00:00`),
          );
        }
      });
  }

  onSalvar() {
    if (!this.itens.length) {
      this.toastService.showError('Informe ao menos um item');
      return;
    }
    for (const item of this.itens) {
      if (!item.quantidade || !item.idProdutos || !item.valorUnitario) {
        throw new Error('Um dos itens está invalido verifique!');
      }
    }

    if (
      this.itens.some(
        (p, i) =>
          this.itens.filter((x) => x.idProdutos === p.idProdutos).length > 1,
      )
    ) {
      this.toastService.showError(
        'Na lista de itens existem produtos duplicados. Verifique!',
      );
      return;
    }

    if (this.formGroup.invalid) {
      this.toastService.showError(ERRO_CAMPOS_OBRIGATORIOS);
      return;
    }
    const obj: NotasFiscaisCreateDto = {
      ...this.formGroup.value,
      itensNotasFiscais: this.itens,
    };

    this.notasFiscaisEdicaoService
      .salvar(obj)
      .pipe(first())
      .subscribe(() => {
        this.toastService.showSuccess(SUCESSO_AO_SALVAR);
        this.router.navigate(['/notas-fiscais-gerenciamento']);
      });
  }
}
