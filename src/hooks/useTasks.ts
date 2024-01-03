import uuid from "react-native-uuid";
import { atom, useAtom } from "jotai";
import { produce } from "immer";

const uuid1 = uuid.v4() as string;
const uuid2 = uuid.v4() as string;
const uuid3 = uuid.v4() as string;

const tasksAtom = atom({
  [uuid1]: { name: "Read a book", isCompleted: false },
  [uuid2]: { name: "Buy groceries", isCompleted: false },
  [uuid3]: { name: "Do laundry", isCompleted: true },
});

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
