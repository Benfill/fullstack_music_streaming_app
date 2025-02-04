import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { LibraryComponent } from './components/library/library.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { libraryReducer } from './store/library.reducer';
import { LibraryEffects } from './store/library.effects';

const routes: Routes = [
  { path: '', component: LibraryComponent }
];

@NgModule({
  declarations: [
    LibraryComponent,
    TrackListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('library', libraryReducer),
    EffectsModule.forFeature([LibraryEffects])
  ]
})
export class LibraryModule { }
