import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../interfaces/user/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  async setUserData(token: string, userData: User) {
    await this.storage.set('accessToken', token);
    await this.storage.set('userData', userData);
  }

  async getAccessToken() {
    return await this.storage.get('accessToken');
  }

  async getUserData() {
    return await this.storage.get('userData');
  }

  async clearUserData() {
    await this.storage.remove('accessToken');
    await this.storage.remove('userData');
  }

  async isAuthenticated() {
    const token = await this.getAccessToken();
    return token !== null;
  }
}