import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        player: {
          // Only persist these specific player state properties
          serialize: (state: any) => ({
            volume: state.volume,
            currentTrack: state.currentTrack,
            currentTime: state.currentTime,
            playlist: state.playlist,
            currentIndex: state.currentIndex
          })
        }
      },
      {
        auth: {
          // Only persist user info from auth state
          serialize: (state: any) => ({
            user: state.user
          })
        }
      },
      {
        library: {
          // Only persist these library state properties
          serialize: (state: any) => ({
            currentFilter: state.currentFilter
          })
        }
      },
      {
        albums: {
          // Only persist filter preferences
          serialize: (state: any) => ({
            currentFilter: state.currentFilter,
            pagination: state.pagination
          })
        }
      }
    ],
    rehydrate: true,
    storage: localStorage,
    removeOnUndefined: true,
    restoreDates: true
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [
  localStorageSyncReducer
];

@NgModule({
  imports: [
    // ... existing imports ...
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  // ... rest of the module config
})
export class AppStoreModule { }
