import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Orcamento, OrcamentoService } from 'src/app/servico/orcamento.service';
import { SharedService } from 'src/app/servico/shared.service'; 
import { Router } from '@angular/router'; // Importe o Router


@Component({
  selector: 'app-addorcamento',
  templateUrl: './addorcamento.page.html',
  styleUrls: ['./addorcamento.page.scss'],
})
export class AddorcamentoPage implements OnInit {

  atualizarOrcamento = false;
  categoriaSelecionada: string | null = null;
  dados: Orcamento = {
    id: '',
    local: '',
    bolo: '',
    bebidas: '',
    decoracoes: '',
    comidas: '',
  };
  opcoes: { [key: string]: any[] } = {
    bolo: [
      { nome: 'Bolo de Chocolate', preco: 'R$50', selecionado: false, categoria: 'bolo' },
      { nome: 'Bolo de Morango', preco: 'R$60', selecionado: false, categoria: 'bolo' },
      { nome: 'Bolo de Coco', preco: 'R$45', selecionado: false, categoria: 'bolo' },
      { nome: 'Bolo de Baunilha', preco: 'R$55', selecionado: false, categoria: 'bolo' },
    ],
    bebidas: [
      { nome: 'Refrigerante', preco: 'R$5', selecionado: false, categoria: 'bebidas' },
      { nome: 'Suco Natural', preco: 'R$8', selecionado: false, categoria: 'bebidas' },
      { nome: 'Coquetel', preco: 'R$10', selecionado: false, categoria: 'bebidas' },
      { nome: 'Água Mineral', preco: 'R$3', selecionado: false, categoria: 'bebidas' },
    ],
    decoracoes: [
      { nome: 'Balões Coloridos', preco: 'R$20', selecionado: false, categoria: 'decoracoes' },
      { nome: 'Velas Decorativas', preco: 'R$15', selecionado: false, categoria: 'decoracoes' },
      { nome: 'Centro de Mesa Floral', preco: 'R$30', selecionado: false, categoria: 'decoracoes' },
      { nome: 'Decoração com Fitas', preco: 'R$25', selecionado: false, categoria: 'decoracoes' },
    ],
    comidas: [
      { nome: 'Mini Sanduíches', preco: 'R$40', selecionado: false, categoria: 'comidas' },
      { nome: 'Canapés Variados', preco: 'R$60', selecionado: false, categoria: 'comidas' },
      { nome: 'Finger Foods', preco: 'R$25', selecionado: false, categoria: 'comidas' },
      { nome: 'Petiscos Especiais', preco: 'R$35', selecionado: false, categoria: 'comidas' },
    ],
    local: [
      { nome: 'Salão de Festas A', selecionado: false, categoria: 'local' },
      { nome: 'Salão de Festas B', selecionado: false, categoria: 'local' },
      { nome: 'Salão de Festas C', selecionado: false, categoria: 'local' },
      { nome: 'Salão de Festas D', selecionado: false, categoria: 'local' },
    ]
  };
  o: any;
  navCtrl: any;

  constructor(
    private modalCtrl: ModalController,
    private orcamentoService: OrcamentoService,
    private toastCtrl: ToastController,
    private sharedService: SharedService,
    private router: Router

    
  ) { }

  ngOnInit() {
    if (this.o) {
      this.atualizarOrcamento = true;
      this.dados = { ...this.o };
    }
  }
  fecharModal() {
    // Fechar o modal e navegar de volta para a página 'orcamentos'
    this.navCtrl.navigateBack('/orcamentos');
  }
  async enviar() {
    try {
      if (this.atualizarOrcamento) {
        await this.orcamentoService.atualizarOrcamento(this.dados, this.o.id).toPromise();
        this.mostrarMensagem('Orçamento atualizado com sucesso.');
      } else {
        await this.orcamentoService.criarOrcamento(this.dados).toPromise();
        this.mostrarMensagem('Orçamento cadastrado com sucesso.');
      }
      this.modalCtrl.dismiss();
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  }

  async mostrarMensagem(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  confirmarOrcamento() {
    const selectedOptions: any[] = this.collectSelectedOptions();
    this.salvarItens(selectedOptions);
  }

  async salvarItens(selectedOptions: any[]) {
    // Obtém os dados existentes do orçamento
    const { id, local: localExistente, bolo: boloExistente, bebidas: bebidasExistente, decoracoes: decoracoesExistente, comidas: comidasExistente } = this.dados;

    // Concatenar os nomes e preços dos itens selecionados para cada categoria
    const boloSelecionado = selectedOptions.filter(opcao => opcao.categoria === 'bolo').map(opcao => `${opcao.nome} - ${opcao.preco}`).join(', ');
    const bebidasSelecionadas = selectedOptions.filter(opcao => opcao.categoria === 'bebidas').map(opcao => `${opcao.nome} - ${opcao.preco}`).join(', ');
    const decoracoesSelecionadas = selectedOptions.filter(opcao => opcao.categoria === 'decoracoes').map(opcao => `${opcao.nome} - ${opcao.preco}`).join(', ');
    const comidasSelecionadas = selectedOptions.filter(opcao => opcao.categoria === 'comidas').map(opcao => `${opcao.nome} - ${opcao.preco}`).join(', ');
    const localSelecionado = selectedOptions.filter(opcao => opcao.categoria === 'local').map(opcao => opcao.nome).join(', ');

    // Mesclar os itens selecionados com os dados existentes
    const orcamento: Orcamento = {
      id: id, // Mantém o ID
      local: localSelecionado || localExistente, // Usa os itens selecionados ou os existentes
      bolo: boloSelecionado || boloExistente,
      bebidas: bebidasSelecionadas || bebidasExistente,
      decoracoes: decoracoesSelecionadas || decoracoesExistente,
      comidas: comidasSelecionadas || comidasExistente
    };

    // Chamar a função da OrcamentoService para enviar os dados para a API
    if (this.atualizarOrcamento) {
      // Se estiver atualizando, chama a função de atualizar
      this.orcamentoService.atualizarOrcamento(orcamento, this.dados.id).subscribe(
        () => {
          this.mostrarMensagem('Orçamento atualizado com sucesso.');
          this.modalCtrl.dismiss();
        },
        (error) => {
          console.error('Erro ao atualizar o orçamento:', error);
          this.mostrarMensagem('Erro ao atualizar o orçamento. Por favor, tente novamente.');
        }
      );
    } else {
      // Se não estiver atualizando, chama a função de criar
      this.orcamentoService.criarOrcamento(orcamento).subscribe(
        () => {
          this.mostrarMensagem('Orçamento confirmado e salvo com sucesso.');
          this.modalCtrl.dismiss();
        },
        (error) => {
          console.error('Erro ao salvar o orçamento:', error);
          this.mostrarMensagem('Erro ao salvar o orçamento. Por favor, tente novamente.');
        }
      );
    }
  }

  collectSelectedOptions(): any[] {
    const selectedOptions: any[] = [];
    [this.opcoes['bolo'], this.opcoes['bebidas'], this.opcoes['decoracoes'], this.opcoes['comidas'], this.opcoes['local']].forEach(opcoesCategoria => {
      opcoesCategoria.filter((opcao: { selecionado: any; }) => opcao.selecionado).forEach((opcao: any) => {
        selectedOptions.push(opcao);
      });
    });
    return selectedOptions;
  }

  mostrarOpcoes(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

  novoOrcamento() {
    this.atualizarOrcamento = false;
    this.dados = {
      id: '',
      local: '',
      bolo: '',
      bebidas: '',
      decoracoes: '',
      comidas: '',
    };
  }

  selecionarTodos(opcoes: any[]) {
    for (const opcao of opcoes) {
      opcao.selecionado = true;
    }
  }
}
