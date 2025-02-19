import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import NotasFiscaisDTO from '../../types/notas-fiscais-dto';

@Injectable({
  providedIn: 'root',
})
export class NotasFiscaisGerenciamentoService extends BaseService {
  constructor(public override http: HttpClient) {
    super(http);
  }

  listNotasFiscais(): Observable<NotasFiscaisDTO[]> {
    return this.get('/notasfiscais');
  }

  deletar(idNotasFiscais: number): Observable<boolean> {
    return this.delete(`/notasfiscais/${idNotasFiscais}`);
  }
}
