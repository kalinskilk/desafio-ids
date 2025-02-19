import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import NotasFiscaisCreateDto from '../../types/notas-fiscais-create-dto';

@Injectable({
  providedIn: 'root',
})
export class NotasFiscaisEdicaoService extends BaseService {
  constructor(public override http: HttpClient) {
    super(http);
  }

  salvar(obj: NotasFiscaisCreateDto): Observable<boolean> {
    return this.post(`/notasfiscais`, obj);
  }

  findById(idNotasFiscais: number): Observable<NotasFiscaisCreateDto> {
    return this.get(`/notasfiscais/${idNotasFiscais}`);
  }
}
