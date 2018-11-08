import { Action } from '@ngrx/store';

export enum PlanActionTypes {
  ReadPlan = '[Plan] Read',
  CreatePlan = '[Plan] Create',
  UpdatePlan = '[Plan] Update',
  DeletePlan = '[Plan] Delete'
}

export class ReadPlan implements Action {
  readonly type = PlanActionTypes.ReadPlan;
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

type PlanActions = ReadPlan | CreatePlan | UpdatePlan | DeletePlan;
