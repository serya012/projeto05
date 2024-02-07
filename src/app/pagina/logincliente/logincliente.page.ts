import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClienteService } from 'src/app/servico/cliente.service';

@Component({
  selector: 'app-logincliente',
  templateUrl: './logincliente.page.html',
  styleUrls: ['./logincliente.page.scss'],
})
export class LoginclientePage {
  email: string = '';
  senha: string = '';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

loginCliente() {
    if (!this.email || !this.senha) {
      this.presentToast('Por favor, preencha todos os campos.');
      return;
    }

    // Verificar se o usuário está cadastrado no banco de dados
    this.clienteService.loginCliente(this.email, this.senha).subscribe(
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