import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // TODO: use .env to store the key value
  private readonly key = 'U2FsdGVkX1';

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    const data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }

  private encrypt(txt: string): string {
    return cryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return cryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(cryptoJS.enc.Utf8);
  }
}
