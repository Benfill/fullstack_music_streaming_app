import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { albumsReducer } from './store/albums.reducer';
import { AlbumsEffects } from './store/albums.effects';

const routes: Routes = [
  { path: '', component: AlbumsListComponent },
  { path: ':id', component: AlbumDetailComponent }
];

@NgModule({
  declarations: [
    AlbumsListComponent,
    AlbumDetailComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('albums', albumsReducer),
    EffectsModule.forFeature([AlbumsEffects])
  ]
})
export class AlbumsModule { }
