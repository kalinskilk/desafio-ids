import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import FornecedoresDTO from '../../types/fornecedores-dto';
import CreateOrUpdateProdutosDto from '../../types/produtos-create-or-update-dto';

@Injectable({
  providedIn: 'root',
})
export class FornecedoresEdicaoService extends BaseService {
  constructor(public override http: HttpClient) {
    super(http);
  }

  salvar(obj: CreateOrUpdateProdutosDto): Observable<any> {
    return this.post(`/fornecedores`, obj);
  }

  findById(idFornecedores: number): Observable<FornecedoresDTO> {
    return this.get(`/fornecedores/${idFornecedores}`);
  }
}
