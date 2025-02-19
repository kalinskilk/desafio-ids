import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastService } from '../../../core/services/toast/toast.service';
import { ItemNotasFiscaisCreateDTO } from '../../../types/notas-fiscais-create-dto';

@Component({
  selector: 'app-table-itens',
  imports: [
    TableModule,
    ButtonModule,
    CurrencyPipe,
    ButtonModule,
    SelectModule,
    FormsModule,
    InputNumberModule,
  ],
  templateUrl: './table-itens.component.html',
  styleUrl: './table-itens.component.scss',
})
export class TableItensComponent {
  @Input() itens: ItemNotasFiscaisCreateDTO[] = [];
  @Input() produtos: { label: string; value: number }[] = [];

  constructor(private toastService: ToastService) {}
  onDelete(i: number) {
    this.itens.splice(i, 1);
  }

  addProduto() {
    this.itens.push({
      idProdutos: null,
      quantidade: 0,
      valorTotalItem: 0,
      valorUnitario: 0,
    });
  }

  onSelectProduto(obj: ItemNotasFiscaisCreateDTO) {
    if (this.itens.filter((x) => x.idProdutos == obj.idProdutos).length > 1) {
      this.toastService.showError('Produto duplicado. Verifique!');
    }
  }
}
