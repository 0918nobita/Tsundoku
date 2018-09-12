import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {
  constructor() {
    super('local-database');
    this.version(1).stores({
      resolvedBooks: '++id, desc, donor, image, &isbn, title, pageCount',
      bookshelf: '++id, deadline, favorite, progress, [isbn + user]'
    });
  }
}
