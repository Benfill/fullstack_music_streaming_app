import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './components/header/header.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { playerReducer } from './store/player/player.reducer';
import { PlayerEffects } from './store/player/player.effects';
import { authReducer } from '../features/auth/store/auth.reducer';
import { albumsReducer } from '../features/albums/store/albums.reducer';
import { libraryReducer } from '../features/library/store/library.reducer';
import { AuthEffects } from '../features/auth/store/auth.effects';

@NgModule({
  declarations: [
    HeaderComponent,
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forRoot({
      auth: authReducer,
      albums: albumsReducer,
      library: libraryReducer,
      player: playerReducer
    }),
    EffectsModule.forRoot([PlayerEffects, AuthEffects])
  ],
  exports: [
    HeaderComponent,
    AudioPlayerComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
