import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pagina/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'addusuario',
    loadChildren: () => import('./pagina/addusuario/addusuario.module').then( m => m.AddusuarioPageModule)
  },
  {
    path: 'addcliente',
    loadChildren: () => import('./pagina/addcliente/addcliente.module').then( m => m.AddclientePageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pagina/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pagina/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pagina/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'addfeedback',
    loadChildren: () => import('./pagina/addfeedback/addfeedback.module').then( m => m.AddfeedbackPageModule)
  },
  {
    path: 'addevento',
    loadChildren: () => import('./pagina/addevento/addevento.module').then( m => m.AddeventoPageModule)
  },
  {
    path: 'orcamentos',
    loadChildren: () => import('./pagina/orcamentos/orcamentos.module').then( m => m.OrcamentosPageModule)
  },
  {
    path: 'addorcamento',
    loadChildren: () => import('./pagina/addorcamento/addorcamento.module').then( m => m.AddorcamentoPageModule)
  },
  {
    path: 'logincliente',
    loadChildren: () => import('./pagina/logincliente/logincliente.module').then( m => m.LoginclientePageModule)
  },
  {
    path: 'loginusuario',
    loadChildren: () => import('./pagina/loginusuario/loginusuario.module').then( m => m.LoginusuarioPageModule)
  },
   {
    path: 'welcome',
    loadChildren: () => import('./pagina/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'privacidade',
    loadChildren: () => import('./pagina/privacidade/privacidade.module').then( m => m.PrivacidadePageModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./pagina/configuracao/configuracao.module').then( m => m.ConfiguracaoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
