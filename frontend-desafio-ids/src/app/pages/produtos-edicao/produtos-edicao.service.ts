import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import CreateOrUpdateProdutosDto from '../../types/produtos-create-or-update-dto';
import ProdutosDto from '../../types/produtos-dto';

@Injectable({
  providedIn: 'root',
})
export class ProdutosEdicaoService extends BaseService {
  constructor(public override http: HttpClient) {
    super(http);
  }

  salvar(obj: CreateOrUpdateProdutosDto): Observable<any> {
    return this.post(`/produtos`, obj);
  }

  findById(idProdutos: number): Observable<ProdutosDto> {
    return this.get(`/produtos/${idProdutos}`);
  }
}
