import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from '../type';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

interface ITaskState {
  listTask: TaskType[];
  changedTask?: TaskType;
  deletedTask?: TaskType;
  flagClear?: boolean;
  searchText?: string;
  preloader: boolean;
}

const initialState: ITaskState = {
  listTask: [],
  changedTask: undefined,
  deletedTask: undefined,
  flagClear: false,
  searchText: '',
  preloader: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    setFlagClear: (state: ITaskState, action: PayloadAction<boolean>) => {
      state.flagClear = action.payload;
    },
    setPreloader: (state: ITaskState, action: PayloadAction<boolean>) => {
      state.preloader = action.payload;
    },
    setSearchText: (state: ITaskState, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    addTask: (state: ITaskState, action: PayloadAction<string>) => {
      const newTask: TaskType = {
        id: uuidv4(),
        caption: action.payload,
        checked: false,
        timeStart: DateTime.now().toMillis(),
      };

      state.changedTask = newTask;
    },
    deleteTask: (state: ITaskState, action: PayloadAction<string>) => {
      state.deletedTask = state.listTask.filter((task) => task.id === action.payload)?.[0];
    },
    deleteTaskFromList: (state: ITaskState, action: PayloadAction<string>) => {
      state.listTask = state.listTask.filter((task) => task.id !== action.payload);
    },
    searchTask: (state: ITaskState, action: PayloadAction<string>) => {
      state.listTask = state.listTask.filter((task) =>
        task.caption.toLowerCase().includes(action.payload.toLowerCase()));
    },
    loadListTask: (state: ITaskState, action: PayloadAction<TaskType[]>) => {
      state.listTask = action.payload;
    },
    updateListTask: (state: ITaskState) => {
      let flagOldTask = false;
      state.listTask = state.listTask.map((task) => {
        if (task.id === state.changedTask?.id) {
          flagOldTask = true;
          return state.changedTask!;
        }
        return task;
      });

      if (!flagOldTask) {
        state.listTask = [
          ...state.listTask,
          state.changedTask!,
        ];
      }
    },
    changeStatusTask: (state: ITaskState, action: PayloadAction<string>) => {
      const changedTask = state.listTask.filter((task) => task.id === action.payload)?.[0];

      if (!changedTask) {
        state.changedTask = undefined;
        return;
      }

      state.changedTask = {
        ...changedTask,
        checked: !changedTask.checked,
        timeFinish: !changedTask.checked ? DateTime.now().toMillis() : undefined,
      };
    },
    changeCaptionTask: (state: ITaskState, action: PayloadAction<{ id: string, caption: string }>) => {
      const changedTask = state.listTask.filter((task) => task.id === action.payload.id)?.[0];

      if (!changedTask) {
        state.changedTask = undefined;
        return;
      }

      state.changedTask = {
        ...changedTask,
        caption: action.payload.caption,
      };
    },
  },
});

export const {
  reset,
  setPreloader,
  setSearchText,
  loadListTask,
  setFlagClear,
  addTask,
  deleteTask,
  deleteTaskFromList,
  changeStatusTask,
  changeCaptionTask,
  updateListTask,
} = taskSlice.actions;

export default taskSlice.reducer;
