import NotasFiscaisDTO from './notas-fiscais-dto';

export interface ItemNotasFiscaisCreateDTO {
  idItemNotasFiscais?: number;
  idProdutos: number | null;
  valorUnitario: number;
  quantidade: number;
  valorTotalItem: number;
}

export default interface NotasFiscaisCreateDto extends NotasFiscaisDTO {
  idNotasFiscais: number;
  numeroNota: string;
  dataEmissao: string | Date;
  valorTotal: number;
  idFornecedor: number;
  itens: ItemNotasFiscaisCreateDTO[];
}
