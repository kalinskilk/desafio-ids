import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'produtos-gerenciamento',
    loadComponent: () =>
      import(
        './pages/produtos-gerenciamento/produtos-gerenciamento.component'
      ).then((m) => m.ProdutosGerenciamentoComponent),
  },
  {
    path: 'produtos-edicao/:id',
    loadComponent: () =>
      import('./pages/produtos-edicao/produtos-edicao.component').then(
        (m) => m.ProdutosEdicaoComponent,
      ),
  },
  {
    path: 'notas-fiscais-gerenciamento',
    loadComponent: () =>
      import(
        './pages/notas-fiscais-gerenciamento/notas-fiscais-gerenciamento.component'
      ).then((m) => m.NotasFiscaisGerenciamentoComponent),
  },
  {
    path: 'notas-fiscais-edicao/:id',
    loadComponent: () =>
      import(
        './pages/notas-fiscais-edicao/notas-fiscais-edicao.component'
      ).then((m) => m.NotasFiscaisEdicaoComponent),
  },
  {
    path: 'fornecedores-gerenciamento',
    loadComponent: () =>
      import(
        './pages/fornecedores-gerenciamento/fornecedores-gerenciamento.component'
      ).then((m) => m.FornecedoresGerenciamentoComponent),
  },
  {
    path: 'fornecedores-edicao/:id',
    loadComponent: () =>
      import('./pages/fornecedores-edicao/fornecedores-edicao.component').then(
        (m) => m.FornecedoresEdicaoComponent,
      ),
  },
  { path: '**', redirectTo: 'home' },
];
