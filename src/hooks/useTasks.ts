import uuid from "react-native-uuid";
import { atom, useAtom } from "jotai";
import { produce } from "immer";

type TaskType = {
  name: string;
  isCompleted: boolean;
};

type TodoListType = {
  name: string;
  tasks: Record<string, TaskType>;
};

type TodoListsType = Record<string, TodoListType>;

const tasksAtom = atom<TodoListType>({ name: "", tasks: {} });

const todoListsAtom = atom<TodoListsType>({});

const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const [todoLists, setTodoLists] = useAtom(todoListsAtom);

  const fillTodoLists = () => {
    setTodoLists({
      todoListKey0: {
        name: "My Tasks",
        tasks: {
          key0: { name: "Call mom", isCompleted: false },
          key1: { name: "Do laundry", isCompleted: false },
          key2: { name: "Write a letter to grandma", isCompleted: false },
          key3: { name: "Check emails", isCompleted: true },
        },
      },
    });
  };

  const addTodoList = (name: string) => {
    const todoListUUID = uuid.v4() as string;

    setTodoLists(
      produce((draft) => {
        draft[todoListUUID] = { name: "New Todo List", tasks: {} };
      })
    );
  };

  const addTask = (todoListKey: string) => {
    setTodoLists(
      produce((draft) => {
        const taskUuid = uuid.v4() as string;
        draft[todoListKey].tasks[taskUuid] = {
          name: "New Task",
          isCompleted: false,
        };
      })
    );
  };

  const toggleTaskIsCompleted = (todoListKey: string, taskKey: string) => {
    setTodoLists(
      produce((draft) => {
        draft[todoListKey].tasks[taskKey].isCompleted =
          !draft[todoListKey].tasks[taskKey].isCompleted;
      })
    );
  };

  const updateTaskName = (
    todoListKey: string,
    taskKey: string,
    newTaskName: string
  ) => {
    setTodoLists(
      produce((draft) => {
        draft[todoListKey].tasks[taskKey].name = newTaskName;
      })
    );
  };

  return {
    tasks,
    todoLists,
    fillTodoLists,
    addTodoList,
    addTask,
    toggleTaskIsCompleted,
    updateTaskName,
  };
};

export default useTasks;
