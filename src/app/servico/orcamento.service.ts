import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Orcamento {
  id: string;
  local: string;
  bolo: string;
  bebidas: string;
  decoracoes: string;
  comidas: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private url = 'http://localhost/api/orcamento';

  constructor(private http: HttpClient) { }

  getAllOrcamentos(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(this.url).pipe(
      catchError(error => {
        console.error('Erro ao obter orçamentos:', error);
        return throwError(error);
      })
    );
  }

  removerOrcamento(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  criarOrcamento(orcamento: Orcamento): Observable<any> {
    return this.http.post(this.url, orcamento).pipe(
      catchError(error => {
        console.error('Erro ao criar orçamento:', error);
        return throwError(error);
      })
    );
  }

  atualizarOrcamento(orcamento: Orcamento, id: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, orcamento).pipe(
      catchError(error => {
        console.error('Erro ao atualizar orçamento:', error);
        return throwError(error);
      })
    );
  }
}
