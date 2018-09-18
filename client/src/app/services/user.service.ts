import { Injectable } from '@angular/core';

import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firebaseService: FirebaseService) {}

  async getUserByName(name: string) {
    try {
      const response =
          await this.firebaseService.functions.httpsCallable('getUserByName')(name);
      return (response.data.length > 0) ? <User> response.data[0] : null;
    } catch (error) {
      throw new Error(error);
    }
  }
}
