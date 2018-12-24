import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class LocalDatabase extends Dexie {
  constructor() {
    super('local-database');
    this.version(1).stores({
      resolvedBooks: '++id, desc, donor, image, &isbn, title, pageCount',
      registeredBooks:
        '++id, deadline, desc, donor, favorite, image, title, pageCount, progress, [isbn+user]'
    });
  }
}
