import { Action } from '@ngrx/store';

import { Plan } from '../../models/plan';

export enum PlanActionTypes {
  WatchPlan = '[Plan] Watch',
  ReloadPlan = '[Plan] Reload',
  WatchPlanFail = '[Plan] Fail in reading',
  CreatePlan = '[Plan] Create',
  UpdatePlan = '[Plan] Update',
  UpdatePlanSuccess = '[Plan] Succeed in updating',
  UpdatePlanFail = '[Plan] Fail in updating',
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

export class UpdatePlan implements Action {
  readonly type = PlanActionTypes.UpdatePlan;
  constructor(
    public payload: {
      isbn: string;
      title: string;
      desc: string;
      progress: number;
    }
  ) {}
}

export class UpdatePlanSuccess implements Action {
  readonly type = PlanActionTypes.UpdatePlanSuccess;
}

export class UpdatePlanFail implements Action {
  readonly type = PlanActionTypes.UpdatePlanFail;
  constructor(public error: any) {}
}

export class DeletePlan implements Action {
  readonly type = PlanActionTypes.DeletePlan;
}
