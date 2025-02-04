import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './components/header/header.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { SharedModule } from '../shared/shared.module';
import { playerReducer } from './store/player/player.reducer';
import { PlayerEffects } from './store/player/player.effects';

@NgModule({
  declarations: [
    HeaderComponent,
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('player', playerReducer),
    EffectsModule.forFeature([PlayerEffects])
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
