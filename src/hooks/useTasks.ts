import uuid from "react-native-uuid";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

const uuid1 = uuid.v4() as string;
const uuid2 = uuid.v4() as string;
const uuid3 = uuid.v4() as string;

const tasksAtom = atomWithImmer({
  [uuid1]: { name: "Read a book", isCompleted: false },
  [uuid2]: { name: "Buy groceries", isCompleted: false },
  [uuid3]: { name: "Do laundry", isCompleted: true },
});

const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = () => {
    setTasks((draft) => {
      const taskUuid = uuid.v4() as string;
      draft[taskUuid] = { name: "test", isCompleted: false };
    });
  };

  const toggleTaskIsCompleted = (taskKey: string) => {
    setTasks((draft) => {
      draft[taskKey].isCompleted = !draft[taskKey].isCompleted;
    });
  };

  return { tasks, addTask, toggleTaskIsCompleted };
};

export default useTasks;
