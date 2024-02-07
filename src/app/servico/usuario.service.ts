import { Injectable } from '@angular/core';
// importação da classe HttpClient
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
//----------------------------------------

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  nivel1: string;
  tipo: 'usuario';
}

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  apiUrl: any;
  getBusca(email: any[]) {
    throw new Error('Method not implemented.');
  }

  //definir o caminho de acesso
  private url = 'http://localhost/api/usuario';
  // private url = 'http://localhost/api/api_usuario.php';

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<[Usuario]>(this.url);
  }
  removerusuario(id:any){
    return this.http.delete(this.url +'/'+id);
  }

  createUsuario(usuario: Usuario){
    return this.http.post(this.url, usuario);
  }

  atualizarUsuario(usuario: Usuario, id: any){
    return this.http.put(this.url + '/' + id, usuario);
  }
  
  // método para buscar o email
  getEmail(email:any){
    return this.http.get(this.url +'/'+email);
  }

  getCpf(cpf: any){
    return this.http.get(this.url + '/' +cpf);
  }
  loginUsuario(email: string, senha: string): Observable<any> {
    const loginData = {
      email: email,
      senha: senha
    };
    return this.http.post(`http://localhost/api/api_usuario.php?login`, loginData);
}
}
  