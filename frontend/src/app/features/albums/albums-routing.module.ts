import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumFormComponent } from './components/album-form/album-form.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

const routes: Routes = [
  { path: '', component: AlbumsListComponent },
  { path: 'form', component: AlbumFormComponent },
  { path: ':id', component: AlbumDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
