import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { LibraryModule } from './library/library.module';
import { AlbumsModule } from './albums/albums.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    LibraryModule,
    AlbumsModule,
  ]
})
export class FeaturesModule { }
