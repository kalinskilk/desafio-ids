import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { SelectButton } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { Subject, delay, finalize, first } from 'rxjs';
import CnpjCpfPipe from '../../core/pipes/cnpj-cpf/cnpj-cpf.pipe';
import PhoneBrPipe from '../../core/pipes/phone-br/phone-br.pipe';
import ConfirmService from '../../core/services/confirm/confirm.service';
import { ToastService } from '../../core/services/toast/toast.service';
import {
  CONFIRMA_EXCLUSAO,
  SUCESSO_AO_DELETAR,
} from '../../shared/consts/msgs';
import FornecedoresDTO from '../../types/fornecedores-dto';
import { FornecedoresGerenciamentoService } from './fornecedores-gerenciamento.service';

@Component({
  selector: 'app-fornecedores-gerenciamento',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    NgIf,
    NgStyle,
    Button,
    SkeletonModule,
    ConfirmDialogModule,
    CardModule,
    ToolbarModule,
    InputIcon,
    IconFieldModule,
    InputText,
    SkeletonModule,
    SelectButton,
    RouterLink,
    CnpjCpfPipe,
    PhoneBrPipe,
  ],
  templateUrl: './fornecedores-gerenciamento.component.html',
  styleUrl: './fornecedores-gerenciamento.component.scss',
})
export class FornecedoresGerenciamentoComponent {
  list: FornecedoresDTO[] = [];
  search: string = '';
  situacao: '' | 'Ativo' | 'Suspenso' | 'Baixado' = '';

  options: any[] = [
    { label: 'Todos', value: '' },
    { label: 'Ativos', value: 'Ativo' },
    { label: 'Suspenso', value: 'Suspenso' },
    { label: 'Baixados', value: 'Baixado' },
  ];

  router = inject(Router);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  loading = false;

  arraySkeleton = Array.from({ length: 5 });

  constructor(
    private fornecedoresGerenciamentoService: FornecedoresGerenciamentoService,
    private confirmService: ConfirmService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  findAll() {
    this.loading = true;
    this.fornecedoresGerenciamentoService
      .listFornecedores(this.situacao)
      .pipe(
        first(),
        delay(1000),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((result) => {
        this.list = result;
      });
  }

  onEdit(id: number) {
    this.router.navigate(['fornecedores-edicao/' + id]);
  }

  onNew() {
    this.onEdit(0);
  }

  async onDelete(event: Event, id: number) {
    const isConfirm = await this.confirmService.confirm({
      event,
      message: CONFIRMA_EXCLUSAO,
    });
    if (isConfirm) {
      this.fornecedoresGerenciamentoService
        .deletar(id)
        .pipe(first())
        .subscribe(() => {
          this.toastService.showSuccess(SUCESSO_AO_DELETAR);
          this.findAll();
        });
    }
  }

  onSearch() {
    this.loading = true;
    this.searchSubject.next(this.search);
  }

  onChangeSituacao() {
    this.findAll();
    console.log(this.situacao);
  }
}
