import { Action } from '@ngrx/store';

import { Plan } from '../../models/plan';

export enum PlanActionTypes {
  WatchPlan = '[Plan] Watch',
  WatchPlanFail = '[Plan] Fail in reading',
  CreatePlan = '[Plan] Create',
  ReloadPlan = '[Plan] Update',
  DeletePlan = '[Plan] Delete'
}

export class WatchPlan implements Action {
  readonly type = PlanActionTypes.WatchPlan;
}

export class ReloadPlan implements Action {
  readonly type = PlanActionTypes.ReloadPlan;
  constructor(public payload: Plan[]) {}
}

export class WatchPlanFail implements Action {
  readonly type = PlanActionTypes.WatchPlanFail;
  constructor(public payload: any) {}
}

export class CreatePlan implements Action {
  readonly type = PlanActionTypes.CreatePlan;
}

export class DeletePlan implements Action {
  readonly type = PlanActionTypes.DeletePlan;
}
