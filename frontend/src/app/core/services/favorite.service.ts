import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private favorites = new Set<string>();

  toggle(id: string) {
    this.favorites.has(id)
      ? this.favorites.delete(id)
      : this.favorites.add(id);
  }

  isFavorite(id: string): boolean {
    return this.favorites.has(id);
  }
}
