import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servico/usuario.service';

@Component({
  selector: 'app-loginusuario',
  templateUrl: './loginusuario.page.html',
  styleUrls: ['./loginusuario.page.scss'],
})
export class LoginusuarioPage {
  email: string = '';
  senha: string = '';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

loginUsuario() {
    if (!this.email || !this.senha) {
      this.presentToast('Por favor, preencha todos os campos.');
      return;
    }

    // Verificar se o usuário está cadastrado no banco de dados
    this.usuarioService.loginUsuario(this.email, this.senha).subscribe(
      (response: any) => {
        if (response && response.id) {
          // Login bem-sucedido
          // Redirecionar para a página de home ou fazer outra ação necessária
          this.router.navigate(['/home']);
        } else {
          this.presentToast('Email ou senha incorretos. Por favor, tente novamente.');
        }
      },
      (error) => {
        console.error(error);
        this.presentToast('Erro ao realizar o login. Tente novamente.');
      }
    );
}
}