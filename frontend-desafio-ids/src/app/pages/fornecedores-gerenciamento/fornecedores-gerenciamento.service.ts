import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import FornecedoresDTO from '../../types/fornecedores-dto';

@Injectable({
  providedIn: 'root',
})
export class FornecedoresGerenciamentoService extends BaseService {
  constructor(public override http: HttpClient) {
    super(http);
  }

  listFornecedores(
    situacao: 'Ativo' | 'Baixado' | 'Suspenso' | '',
  ): Observable<FornecedoresDTO[]> {
    let params = new HttpParams();
    if (situacao) {
      params = params.append('situacao', situacao);
    }

    return this.get('/fornecedores', params);
  }

  deletar(idFornecedores: number): Observable<boolean> {
    return this.delete(`/fornecedores/${idFornecedores}`);
  }
}
