import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { albumsReducer } from './store/albums.reducer';
import { AlbumsEffects } from './store/albums.effects';
import { CommonModule } from '@angular/common';
import { AlbumFormComponent } from './components/album-form/album-form.component';
import { LibraryModule } from '../library/library.module';
import { AlbumsRoutingModule } from './albums-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlbumsListComponent,
    AlbumDetailComponent,
    AlbumFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibraryModule,
    AlbumsRoutingModule,
    StoreModule.forFeature('albums', albumsReducer),
    EffectsModule.forFeature([AlbumsEffects]),
    ReactiveFormsModule
  ]
})
export class AlbumsModule { }
