import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { delay, finalize, first } from 'rxjs';
import ConfirmService from '../../core/services/confirm/confirm.service';
import { ToastService } from '../../core/services/toast/toast.service';
import {
  CONFIRMA_EXCLUSAO,
  SUCESSO_AO_DELETAR,
} from '../../shared/consts/msgs';
import NotasFiscaisDTO from '../../types/notas-fiscais-dto';
import { NotasFiscaisGerenciamentoService } from './notas-fiscais-gerenciamento.service';

@Component({
  selector: 'app-notas-fiscais-gerenciamento',
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
    RouterLink,
  ],
  templateUrl: './notas-fiscais-gerenciamento.component.html',
  styleUrl: './notas-fiscais-gerenciamento.component.scss',
})
export class NotasFiscaisGerenciamentoComponent {
  @ViewChild('table') table!: Table;
  list: NotasFiscaisDTO[] = [];
  search: string = '';

  router = inject(Router);

  loading = false;

  arraySkeleton = Array.from({ length: 5 });

  constructor(
    private notasFiscaisGerenciamentoService: NotasFiscaisGerenciamentoService,
    private confirmService: ConfirmService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy() {}

  findAll() {
    this.loading = true;
    this.notasFiscaisGerenciamentoService
      .listNotasFiscais()
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
    this.router.navigate(['notas-fiscais-edicao/' + id]);
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
      this.notasFiscaisGerenciamentoService
        .deletar(id)
        .pipe(first())
        .subscribe(() => {
          this.toastService.showSuccess(SUCESSO_AO_DELETAR);
          this.findAll();
        });
    }
  }

  onSearch() {
    this.table.filterGlobal(this.search, 'contains');
  }

  onChangeSituacao() {
    this.findAll();
  }
}
