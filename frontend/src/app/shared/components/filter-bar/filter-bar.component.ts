import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  template: `
    <div class="flex gap-4 p-4">
      <select
        (change)="onFilterChange($event)"
        class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option *ngFor="let category of categories" [value]="category">
          {{category}}
        </option>
      </select>

      <select
        (change)="onSortChange($event)"
        class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="artist">Artist</option>
        <option value="duration">Duration</option>
      </select>
    </div>
  `
})
export class FilterSortBarComponent {
  @Input() categories: string[] = [];
  @Output() filterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();

  onFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filterChange.emit(value);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortChange.emit(value);
  }
}
