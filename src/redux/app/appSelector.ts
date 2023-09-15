import {RootState} from '../store';

export const selectTasks = (state: RootState) => state.app.tasks;
export const selectOpenDatetimeModal = (state: RootState) =>
  state.app.openDatetimeModal;
