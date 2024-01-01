import uuid from "react-native-uuid";
import { atom, useAtom } from "jotai";

const uuid1 = uuid.v4() as string;
const uuid2 = uuid.v4() as string;
const uuid3 = uuid.v4() as string;

const tasksAtom = atom({
  [uuid1]: { name: "Read a book", isCompleted: false },
  [uuid2]: { name: "Buy groceries", isCompleted: false },
  [uuid3]: { name: "Do laundry", isCompleted: true },
});

const useTasks = () => {
  const [tasks] = useAtom(tasksAtom);

  return { tasks };
};

export default useTasks;
