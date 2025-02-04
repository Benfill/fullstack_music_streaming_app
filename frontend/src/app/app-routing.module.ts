import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'library',
        loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule)
      },
      {
        path: 'albums',
        loadChildren: () => import('./features/albums/albums.module').then(m => m.AlbumsModule)
      },
      {
        path: '',
        redirectTo: 'library',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
