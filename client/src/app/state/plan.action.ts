import { Action } from '@ngrx/store';

import { Plan } from '../models/plan';

export enum PlanActionTypes {
  ReadPlan = '[Plan] Read',
  CreatePlan = '[Plan] Create',
  UpdatePlan = '[Plan] Update',
  DeletePlan = '[Plan] Delete'
}

export class ReadPlan implements Action {
  readonly type = PlanActionTypes.ReadPlan;
}

export class CreatePlan implements Action {
  readonly type = PlanActionTypes.CreatePlan;
}

export class UpdatePlan implements Action {
  readonly type = PlanActionTypes.UpdatePlan;
  constructor(public payload: { id: string; plan: Plan }) {}
}

export class DeletePlan implements Action {
  readonly type = PlanActionTypes.DeletePlan;
}

type PlanActions = ReadPlan | CreatePlan | UpdatePlan | DeletePlan;
