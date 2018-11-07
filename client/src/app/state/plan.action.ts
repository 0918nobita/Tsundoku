import { Action } from '@ngrx/store';

export enum PlanActionTypes {
  CreatePlan = '[Plan] Create',
  UpdatePlan = '[Plan] Update',
  DeletePlan = '[Plan] Delete'
}

class CreatePlan implements Action {
  readonly type = PlanActionTypes.CreatePlan;
}

class UpdatePlan implements Action {
  readonly type = PlanActionTypes.UpdatePlan;
}

class DeletePlan implements Action {
  readonly type = PlanActionTypes.DeletePlan;
}

type PlanActions = CreatePlan | UpdatePlan | DeletePlan;
