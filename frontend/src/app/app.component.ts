import { selectIsAuthenticated } from './features/auth/store/auth.selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentTrack } from './core/store/player/player.selectors';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated$: Observable<boolean>;
  currentTrack$: Observable<any>;
  showStickyButton$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.currentTrack$ = this.store.select(selectCurrentTrack);

    // Only show sticky button when not in auth routes
    this.showStickyButton$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      map(event => !event.url.includes('/auth'))
    );
  }
}
