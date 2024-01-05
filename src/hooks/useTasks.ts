import uuid from "react-native-uuid";
import { atom, useAtom } from "jotai";
import { produce } from "immer";

export interface ITask {
  name: string;
  isCompleted: boolean;
}

const tasksAtom = atom<Record<string, ITask>>({});

const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = () => {
    setTasks(
      produce((draft) => {
        const taskUuid = uuid.v4() as string;
        draft[taskUuid] = { name: "test", isCompleted: false };
      })
    );
  };

  const toggleTaskIsCompleted = (taskKey: string) => {
    setTasks(
      produce((draft) => {
        draft[taskKey].isCompleted = !draft[taskKey].isCompleted;
      })
    );
  };

  const updateTaskName = (taskKey: string, newTaskName: string) => {
    setTasks(
      produce((draft) => {
        draft[taskKey].name = newTaskName;
      })
    );
  };

  return { tasks, addTask, toggleTaskIsCompleted, updateTaskName };
};

export default useTasks;
