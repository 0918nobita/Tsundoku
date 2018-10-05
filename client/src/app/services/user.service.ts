import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

import { User } from 'shared/entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afFirestore: AngularFirestore) {}

  async getUserByName(name: string): Promise<User> {
    const result = await this.afFirestore
        .collection<User>('users', ref => ref.where('name', '==', name))
        .valueChanges().pipe(take(1)).toPromise();
    if (result.length === 0) throw new Error('ユーザーが見つかりません');
    return { ...result[0] };
  }

  async getUserByUID(uid: string): Promise<User> {
    const result = await this.afFirestore
        .collection<User>('users', ref => ref.where('uid', '==', uid))
        .valueChanges().pipe(take(1)).toPromise();
    if (result.length === 0) throw new Error('ユーザーが見つかりません');
    return { ...result[0] };
  }
}
