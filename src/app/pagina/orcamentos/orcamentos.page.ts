import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { SharedService } from 'src/app/servico/shared.service';
import { OrcamentoService, Orcamento } from 'src/app/servico/orcamento.service';
import { AddorcamentoPage } from '../addorcamento/addorcamento.page';

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.page.html',
  styleUrls: ['./orcamentos.page.scss'],
})
export class OrcamentosPage implements OnInit {
  orcamentos: Orcamento[] = [];

  gasto: string = '';
  orcamento: string = '';
  items: any[] = []; // Adicione esta linha para declarar a variável items

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private sharedService: SharedService,
    private orcamentoService: OrcamentoService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.carregarOrcamentos();
    this.items = this.sharedService.getOptions();
  }

  async novoOrcamento() {
    const modal = await this.modalCtrl.create({
      component: AddorcamentoPage
    });

    modal.onDidDismiss().then(() => {
      this.carregarOrcamentos();
    });

    await modal.present();
  }

  async confirmarExclusao(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir este orçamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.removerOrcamento(id);
          }
        }
      ]
    });

    await alert.present();
  }

  removerOrcamento(id: any) {
    this.orcamentoService.removerOrcamento(id).subscribe(() => {
      this.carregarOrcamentos();
    });
  }

  private carregarOrcamentos() {
    this.orcamentoService.getAllOrcamentos().subscribe(response => {
      this.orcamentos = response;
    });
  }

  async atualizarOrcamento(orcamento: Orcamento) {
    const modal = await this.modalCtrl.create({
      component: AddorcamentoPage,
      componentProps: { o: orcamento }
    });
  
    modal.onDidDismiss().then(() => {
      this.carregarOrcamentos();
    });
  
    await modal.present();
  }

  async mostrarMensagem(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async salvar() {
    const selectedOptions = this.sharedService.getOptions();
    console.log('Opções selecionadas em Orcamento:', selectedOptions);

    if (this.gasto && this.orcamento) {
      this.mostrarAlerta('Salvo', 'Os dados foram salvos com sucesso.');
    } else {
      this.mostrarAlerta('Campos Vazios', 'Por favor, preencha os campos de gasto e orçamento.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  addorcamento() {
    this.navCtrl.navigateForward('/addorcamento');
  }
}
