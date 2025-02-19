import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import ProdutosDto from '../../types/produtos-dto';

import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutosGerenciamentoService extends BaseService {
  constructor(public override http: HttpClient) {
    super(http);
  }

  listProdutos(descricao?: string, ativo?: boolean): Observable<ProdutosDto[]> {
    let params = new HttpParams();
    if (descricao) {
      params = params.append('descricao', descricao);
    }
    if (ativo !== undefined) {
      params = params.append('situacao', ativo.toString());
    }
    return this.get('/produtos', params);
  }

  deletar(idProdutos: number): Observable<boolean> {
    return this.delete(`/produtos/${idProdutos}`);
  }
}
