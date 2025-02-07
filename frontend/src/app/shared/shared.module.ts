import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FilterSortBarComponent } from './components/filter-bar/filter-bar.component';
import { TrackListComponent } from '../features/library/components/track-list/track-list.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    FilterSortBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SearchBarComponent,
    FilterSortBarComponent
  ]
})
export class SharedModule { }
