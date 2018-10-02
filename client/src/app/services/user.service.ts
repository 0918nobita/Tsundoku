import { Injectable } from '@angular/core';

import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firebaseService: FirebaseService) {}

  async getUserByName(name: string): Promise<User> {
    try {
      const response =
          await this.firebaseService.functions.httpsCallable('getUserByName')(name);
      if (response.data !== null) return <User> response.data;
      throw new Error('ユーザーが見つかりません');
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByUID(uid: string): Promise<User> {
    try {
      const result = await this.firebaseService.functions.httpsCallable('getUserByUID')(uid);
      const data = result.data;

      if (data.length === 0) throw new Error('ユーザーが見つかりません');

      return {
        bio: data.bio,
        image: data.image,
        name: data.name,
        screenName: data.screenName,
        uid
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
