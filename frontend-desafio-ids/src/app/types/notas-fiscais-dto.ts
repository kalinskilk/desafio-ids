export default interface NotasFiscaisDTO {
  idNotasFiscais: number;
  numeroNota: string;
  dataEmissao: string | Date;
  valorTotal: number;
  idFornecedor: number;
  razaoSocial: string;
}
