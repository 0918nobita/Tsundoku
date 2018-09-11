import { Injectable } from '@angular/core';
import { ResolvedBook } from 'shared/entity';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: IDBDatabase;

  constructor() {
    const idbReq = indexedDB.open('local-database', 1);

    idbReq.onupgradeneeded = event => {
      console.log('[Upgradeneeded]');
      const oldVersion = event.oldVersion;
      console.log('oldVersion: ', oldVersion);

      this.db = idbReq.result;
      const resolvedBooks = this.db.createObjectStore('resolved-books', { keyPath: 'isbn' });
      resolvedBooks.createIndex('desc', 'desc', { unique: false });
      resolvedBooks.createIndex('donor', 'donor', { unique: false });
      resolvedBooks.createIndex('image', 'image', { unique: false });
      resolvedBooks.createIndex('isbn', 'isbn', { unique: true });
      resolvedBooks.createIndex('pageCount', 'pageCount', { unique: false });
      console.log('objectStoreNames: ', this.db.objectStoreNames);
    };

    idbReq.onsuccess = event => {
      console.log('[Success]');
      this.db = idbReq.result;
      console.log('objectStoreNames: ', this.db.objectStoreNames);

      /*const transaction: IDBTransaction = this.db.transaction(['resolved-books'], 'readwrite');
      transaction.oncomplete = () => console.log('トランザクションが完了しました');
      transaction.onerror = () => console.log('トランザクションが失敗しました');

      const resolvedBooks = transaction.objectStore('resolved-books');*/

      /*const sampleData: ResolvedBook[] = [
        {
          desc: '熱い心を持つエンジニアに贈る、セキュリティの第一人者による渾身の書。GCC4をひっさげて、あの漢が帰ってきた!',
          donor: 'none',
          image: 'https://books.google.com/books/content?id=g_Q8DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          isbn: '4798051543',
          title: '大熱血!ｱｾﾝﾌﾞﾗ入門',
          pageCount: 1163
        },
        {
          desc: 'C言語をはじめとする高級言語が主流の今、その基礎となる機械語やアセンブリ言語がCPUでどう実行されるかを意識することはめったにありませんが、本書ではそういった“低級言語”を実行するエミュレータの制作を通してx86 CPUの仕組みや、その周りで動くメモリ、キーボード、ディスプレイといった部品とCPUの関わりをしっかり学び、エンジニアとしての“深み”を身につけることを目指します。 ≪CONTENTS≫Chapter 1 C 言語とアセンブリ言語／Chapter 2 ポインタとアセンブリ言語／Chapter 3 CPU がプログラムを実行する仕組み／Chapter 4 BIOS の仕組みと実機起動／Appendix／A 開発環境のインストールと構成／B ASCII コード表',
          donor: 'none',
          image: 'https://books.google.com/books/content?id=kq9lCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
          isbn: '4839954747',
          title: '自作エミュレータで学ぶx86アーキテクチャ',
          pageCount: 196
        },
        {
          desc: 'コンピューターの中核であるCPUという名のブラックボックス。その動作の「超」基本原理から具体的な設計例までを解説。アキバで手に入る部品だけで実際の製作も可能。',
          donor: 'none',
          image: 'https://books.google.com/books/content?id=mPfkAAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
          isbn: '4839909865',
          title: 'CPUの創りかた',
          pageCount: 319
        }
      ];

      for (let i = 0; i < sampleData.length; i++) {
        const request = resolvedBooks.add(sampleData[i]);
        request.onsuccess = () => console.log('追加に成功しました: ', sampleData[i]);
        request.onerror = () => console.log('追加に失敗しました: ', sampleData[i]);
      }*/

      /*resolvedBooks.get('4839954747').onsuccess =
        event => console.log((<IDBRequest>event.target).result);*/
    };
  }
}
