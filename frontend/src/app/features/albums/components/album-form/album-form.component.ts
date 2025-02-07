import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ADMIN_API_ENDPOINTS } from '../../models/album.model';

@Component({
  selector: 'app-album-form',
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <!-- Form Type Selector -->
      <div class="flex gap-4 mb-6">
        <button
          (click)="setFormType('album')"
          [class.bg-blue-600]="formType === 'album'"
          [class.text-white]="formType === 'album'"
          [class.bg-gray-100]="formType !== 'album'"
          class="px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
          Album Form
        </button>
        <button
          (click)="setFormType('song')"
          [class.bg-blue-600]="formType === 'song'"
          [class.text-white]="formType === 'song'"
          [class.bg-gray-100]="formType !== 'song'"
          class="px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
          Song Form
        </button>
      </div>

      <form [formGroup]="musicForm" (ngSubmit)="$event.preventDefault(); onSubmit()" class="space-y-4">
        <!-- Common Fields -->
        <div class="space-y-2">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            formControlName="title"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
          <span *ngIf="musicForm.get('title')?.errors?.['required'] && musicForm.get('title')?.touched"
                class="text-sm text-red-600">
            Title is required
          </span>
        </div>

        <!-- Album-specific fields -->
        <ng-container *ngIf="formType === 'album'">
          <div class="space-y-2">
            <label for="artist" class="block text-sm font-medium text-gray-700">Artist</label>
            <input
              id="artist"
              type="text"
              formControlName="artist"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <span *ngIf="musicForm.get('artist')?.errors?.['required'] && musicForm.get('artist')?.touched"
                  class="text-sm text-red-600">
              Album's artist is required
            </span>
          </div>

          <div class="space-y-2">
            <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
            <input
              id="year"
              type="number"
              formControlName="year"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <span *ngIf="musicForm.get('year')?.errors?.['required'] && musicForm.get('year')?.touched"
                  class="text-sm text-red-600">
              Album's year is required
            </span>
          </div>
        </ng-container>

        <!-- Song-specific fields -->
        <ng-container *ngIf="formType === 'song'">
          <div class="space-y-2">
            <label for="duration" class="block text-sm font-medium text-gray-700">Duration (seconds)</label>
            <input
              id="duration"
              type="number"
              formControlName="duration"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <span *ngIf="musicForm.get('duration')?.errors?.['required'] && musicForm.get('duration')?.touched"
                  class="text-sm text-red-600">
              Song's duration is required
            </span>
          </div>

          <div class="space-y-2">
            <label for="number" class="block text-sm font-medium text-gray-700">Track Number</label>
            <input
              id="number"
              type="number"
              formControlName="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <span *ngIf="musicForm.get('number')?.errors?.['required'] && musicForm.get('number')?.touched"
                  class="text-sm text-red-600">
              Song's number is required
            </span>
          </div>

          <div class="space-y-2">
            <label for="albumId" class="block text-sm font-medium text-gray-700">Album ID</label>
            <input
              id="albumId"
              type="text"
              formControlName="albumId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <span *ngIf="musicForm.get('albumId')?.errors?.['required'] && musicForm.get('albumId')?.touched"
                  class="text-sm text-red-600">
              Album's id is required
            </span>
          </div>

          <div class="space-y-2">
            <label for="file" class="block text-sm font-medium text-gray-700">Audio File</label>
            <input
              #fileInput
              id="file"
              type="file"
              (change)="onFileSelected($event)"
              accept=".mp3,.wav,.ogg"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <div class="text-sm text-gray-500">
              Accepted formats: MP3, WAV, OGG (Max size: 10MB)
            </div>
            <span *ngIf="fileError" class="text-sm text-red-600">
              {{ fileError }}
            </span>
          </div>
        </ng-container>

        <!-- Replaced the existing submit button with a sticky version -->
        <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
          <div class="max-w-2xl mx-auto">
            <button
              type="submit"
              [disabled]="!musicForm.valid || (formType === 'song' && !isFileValid)"
              class="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
              {{ formType === 'album' ? 'Create Album' : 'Create Song' }}
            </button>
          </div>
        </div>

        <!-- Add padding at the bottom to prevent content from being hidden behind the sticky button -->
        <div class="h-20"></div>
      </form>
    </div>
  `
})
export class AlbumFormComponent implements OnInit {
  musicForm: FormGroup;
  formType: 'album' | 'song' = 'album';
  fileError: string | null = null;
  isFileValid = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.musicForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  setFormType(type: 'album' | 'song') {
    this.formType = type;
    this.initializeForm();
    this.fileError = null;
    this.isFileValid = false;
    this.selectedFile = null;
  }

  private initializeForm() {
    if (this.formType === 'album') {
      this.musicForm = this.fb.group({
        title: ['', Validators.required],
        artist: ['', Validators.required],
        year: ['', Validators.required],
      });
    } else {
      this.musicForm = this.fb.group({
        title: ['', Validators.required],
        duration: ['', Validators.required],
        number: ['', Validators.required],
        albumId: ['', Validators.required],
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.fileError = null;
      this.isFileValid = false;

      // Check file type - include all possible MP3 MIME types
      const validTypes = [
        'audio/mp3',
        'audio/mpeg',
        'audio/mpeg3',
        'audio/x-mpeg-3',
        'audio/wav',
        'audio/ogg'
      ];

      // Check file extension as well
      const validExtensions = ['.mp3', '.wav', '.ogg'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

      if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
        this.fileError = 'Invalid file type. Please upload MP3, WAV, or OGG file.';
        return;
      }

      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        this.fileError = 'File size must be less than 10MB';
        return;
      }

      this.selectedFile = file;
      this.isFileValid = true;
    }
  }

  onSubmit() {
    if (this.musicForm.valid && (this.formType !== 'song' || this.isFileValid)) {
      if (this.formType === 'album') {
        // For albums, send JSON directly
        const albumData = this.musicForm.value;

        this.http.post(ADMIN_API_ENDPOINTS.albums, albumData, {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe({
          next: (response) => {
            console.log('Album created successfully', response);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error creating album:', error);
          }
        });
      } else {
        // For songs, use FormData (multipart/form-data)
        const formData = new FormData();

        Object.keys(this.musicForm.value).forEach(key => {
          formData.append(key, this.musicForm.value[key]);
        });

        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }

        this.http.post(ADMIN_API_ENDPOINTS.songs, formData).subscribe({
          next: (response) => {
            console.log('Song created successfully', response);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error creating song:', error);
          }
        });
      }
    }
  }
}
