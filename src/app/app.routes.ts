import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'image-generator',
    pathMatch: 'full',
  },
  {
    path: 'image-generator',
    loadComponent: () => import('./image-generator/image-generator').then((m) => m.ImageGenerator),
  },
];
