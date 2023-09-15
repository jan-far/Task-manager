import {TaskDetails} from './../../../types';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
  tasks: TaskDetails[];
  openDatetimeModal: boolean;
}

const initialState: AppState = {
  tasks: [],
  openDatetimeModal: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskDetails>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTask: (state, action: PayloadAction<TaskDetails>) => {
      const data = state.tasks;
      const index = state.tasks.findIndex(v => v.id === action.payload.id);
      // remove the Task and update it with the recent info
      data.splice(index, 1, action.payload);
      state.tasks = data;
    },
    deleteTask: (state, action: PayloadAction<TaskDetails>) => {
      const newData = state.tasks.filter(d => d.id !== action.payload.id);
      console.log(newData.length);
      state.tasks = newData;
    },
    setDatetimeModal: (state, action: PayloadAction<boolean>) => {
      state.openDatetimeModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addTask, deleteTask, updateTask, setDatetimeModal} =
  appSlice.actions;

export default appSlice.reducer;
