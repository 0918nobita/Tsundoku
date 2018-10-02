import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { User } from 'shared/entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afFunctions: AngularFireFunctions) {}

  async getUserByName(name: string): Promise<User> {
    const response =
        await this.afFunctions.functions.httpsCallable('getUserByName')(name);
    if (response.data === null) throw new Error('ユーザーが見つかりません');
    return <User> response.data;
  }

  async getUserByUID(uid: string): Promise<User> {
    const result = await this.afFunctions.functions.httpsCallable('getUserByUID')(uid);
    const data = result.data;

    if (data.length === 0) throw new Error('ユーザーが見つかりません');

    return {
      bio: data.bio,
      image: data.image,
      name: data.name,
      screenName: data.screenName,
      uid
    };
  }
}
