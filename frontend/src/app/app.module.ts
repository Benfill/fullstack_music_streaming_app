import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { LibraryModule } from './features/library/library.module';
import { AlbumsModule } from './features/albums/albums.module';
import { FeaturesModule } from './features/features.module';
import { playerReducer } from './store/player/player.reducer';
import { PlayerEffects } from './store/player/player.effects';
import { StickyActionButtonComponent } from './shared/components/sticky-action-button/sticky-action-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StickyActionButtonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('player', playerReducer),
    EffectsModule.forRoot([PlayerEffects]),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeaturesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
