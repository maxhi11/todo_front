import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const index = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default index;
export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
export const selectTasks = (state:RootState) => state.task.listTask;
export const selectPreloader = (state:RootState) => state.task.preloader;
export const selectFlagClear = (state:RootState) => state.task.flagClear;
export const selectSearchText = (state:RootState) => state.task.searchText;
export const selectChangedTask = (state:RootState) => state.task.changedTask;
export const selectDeletedTask = (state:RootState) => state.task.deletedTask;
