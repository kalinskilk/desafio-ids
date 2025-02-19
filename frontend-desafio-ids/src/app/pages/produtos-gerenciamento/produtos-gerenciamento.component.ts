import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  finalize,
  first,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import ConfirmService from '../../core/services/confirm/confirm.service';
import { ToastService } from '../../core/services/toast/toast.service';
import {
  CONFIRMA_EXCLUSAO,
  SUCESSO_AO_DELETAR,
} from '../../shared/consts/msgs';
import ProdutosDto from '../../types/produtos-dto';
import { ProdutosGerenciamentoService } from './produtos-gerenciamento.service';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { SelectButton } from 'primeng/selectbutton';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  selector: 'app-produtos-gerenciamento',
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
  ],
  templateUrl: './produtos-gerenciamento.component.html',
  styleUrl: './produtos-gerenciamento.component.scss',
})
export class ProdutosGerenciamentoComponent implements OnInit, OnDestroy {
  list: ProdutosDto[] = [];
  search: string = '';
  situacao: string = 'undefined';

  options: any[] = [
    { label: 'Todos', value: 'undefined' },
    { label: 'Ativos', value: 'true' },
    { label: 'Inativos', value: 'false' },
  ];

  router = inject(Router);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  loading = false;

  arraySkeleton = Array.from({ length: 5 });

  constructor(
    private produtosGerenciamentoService: ProdutosGerenciamentoService,
    private confirmService: ConfirmService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.searchSubject
      .pipe(
        delay(1000),
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((value) =>
          this.produtosGerenciamentoService.listProdutos(
            value,
            this.getSituacao(),
          ),
        ),
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data: any) => (this.list = data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  findAll() {
    this.loading = true;
    this.produtosGerenciamentoService
      .listProdutos(this.search, this.getSituacao())
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
    this.router.navigate(['produtos-edicao/' + id]);
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
      this.produtosGerenciamentoService
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
  }

  private getSituacao() {
    if (this.situacao === 'undefined') {
      return undefined;
    }
    return this.situacao === 'true';
  }
}
