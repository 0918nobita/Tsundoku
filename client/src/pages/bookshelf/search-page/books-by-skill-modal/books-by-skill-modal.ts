import { FundamentalModal } from '../../../../pages/fundamental-modal';
import { ViewController, ToastController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill } from '../../../../app/models/skill';
import { BookService } from '../../../../app/services/book.service';
import { ResolvedBook } from '../../../../app/models/resolved-book';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'books-by-skill-modal.html'
})
export class BooksBySkillModal extends FundamentalModal {
  content: string;
  books$: Observable<ResolvedBook[]>;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private navParams: NavParams,
    private afFirestore: AngularFirestore,
    private bookService: BookService
  ) {
    super(viewCtrl, toastCtrl);
    this.content = this.navParams.get('content');
  }

  ionViewWillEnter() {
    this.books$ = this.afFirestore
      .collection<Skill>('skills', ref =>
        ref.where('content', '==', this.content)
      )
      .valueChanges()
      .pipe(
        mergeMap(async skills => {
          const isbnList = unique(skills.map(skill => skill.isbn));
          const books: ResolvedBook[] = [];
          for (const isbn of isbnList) {
            const book = await this.bookService.getBookByISBN(isbn);
            if (book === null) {
              this.showError('本の情報の取得に失敗しました');
              continue;
            }
            books.push(book);
          }
          return books;
        })
      );

    function unique(array) {
      return array.filter(function(value, index, self) {
        return self.indexOf(value) === index;
      });
    }
  }
}
