import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  nivel2: string;
  tipo: 'cliente';
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl: any;
  getBusca(email: any[]) {
    throw new Error('Method not implemented.');
  }

  private url = 'http://localhost/api/cliente';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Cliente]>(this.url);
  }

 removercliente2(id:any){
    return this.http.delete(this.url +'/'+id);
  }

  createCliente(cliente: Cliente){
    return this.http.post(this.url, cliente);
  }

  atualizarCliente(cliente: Cliente, id: any){
    return this.http.put(this.url + '/' + id, cliente);
  }
  
  // método para buscar o email
  getEmail(email:any){
    return this.http.get(this.url +'/'+email);
  }

  getCpf(cpf: any){
    return this.http.get(this.url + '/' +cpf);
  }

  loginCliente(email: string, senha: string): Observable<any> {
    const loginData = {
      email: email,
      senha: senha
    };
    return this.http.post(`http://localhost/api/api_cliente.php?login`, loginData);
}
}