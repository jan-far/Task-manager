export type TaskDetails = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type RootStackParamList = {
  Home: undefined;
  AddTask: {data: TaskDetails} | undefined;
  TaskDetails: {id: TaskDetails['id']};
};
