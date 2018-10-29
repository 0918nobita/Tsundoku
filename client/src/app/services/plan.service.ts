import { Injectable } from '@angular/core';
import { Plan, ResolvedBook } from "shared/entity";

export interface DetailedPlan extends Plan {
  book: ResolvedBook
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor() {}
}
