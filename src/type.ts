export type TaskType = {
  id: string,
  caption: string,
  checked: boolean,
  timeStart: number,
  timeFinish?: number
};

export type RequestType = 'search' | 'clear' | 'add' | 'tasks' | 'delete' | 'edit' | 'none';
