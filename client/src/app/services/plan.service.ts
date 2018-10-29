import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Plan, ResolvedBook } from 'shared/entity';
import { BookService } from './book.service';
import { mine } from './firestore.service';

export interface DetailedPlan extends Plan {
  book: ResolvedBook;
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor(
    private afFirestore: AngularFirestore,
    private bookService: BookService
  ) {}

  getPlans(): Observable<DetailedPlan> {
    const attachBookDetails = (plan: Plan) =>
      this.bookService
        .getBookByISBN(plan.isbn)
        .then(result => <DetailedPlan>{ ...plan, book: { ...result } });

    const nextDetailedPlans = (plans: Plan[]) =>
      from(plans).pipe(flatMap(plan => from(attachBookDetails(plan))));

    return this.afFirestore
      .collection<Plan>('plans', mine)
      .valueChanges()
      .pipe(flatMap(nextDetailedPlans));
  }
}
