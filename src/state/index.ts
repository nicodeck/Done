import { produce } from "immer";
import { atom } from "jotai";
import uuid from "react-native-uuid";

type TaskType = {
  name: string;
  isCompleted: boolean;
};

type TodoListType = {
  name: string;
  tasks: Record<string, TaskType>;
};

type TodoListsType = Record<string, TodoListType>;

type ActionType =
  | {
      type: "SeedTodoLists";
    }
  | {
      type: "AddNewTodoList";
    }
  | {
      type: "AddNewTask";
      todoListKey: string;
    }
  | {
      type: "ToggleTaskIsCompleted";
      todoListKey: string;
      taskKey: string;
    }
  | {
      type: "UpdateTaskName";
      todoListKey: string;
      taskKey: string;
      name: string;
    }
  | {
      type: "DeleteTask";
      todoListKey: string;
      taskKey: string;
    };

function reducer(state: TodoListsType, action: ActionType) {
  switch (action.type) {
    case "SeedTodoLists": {
      return {
        todoListKey0: {
          name: "My Tasks",
          tasks: {
            key0: { name: "Call mom", isCompleted: false },
            key1: { name: "Do laundry", isCompleted: false },
            key2: { name: "Write a letter to grandma", isCompleted: false },
            key3: { name: "Check emails", isCompleted: true },
          },
        },
      };
    }
    case "AddNewTodoList": {
      const todoListUUID = uuid.v4() as string;
      return produce(state, (draft) => {
        draft[todoListUUID] = { name: "New Todo List", tasks: {} };
      });
    }

    case "AddNewTask": {
      const todoListKey = action.todoListKey;
      const taskUUID = uuid.v4() as string;
      return produce((draft) => {
        draft[todoListKey].tasks[taskUUID] = {
          name: "New Task",
          isCompleted: false,
        };
      });
    }

    case "ToggleTaskIsCompleted": {
      const todoListKey = action.todoListKey;
      const taskKey = action.taskKey;
      return produce((draft) => {
        draft[todoListKey].tasks[taskKey].isCompleted =
          !draft[todoListKey].tasks[taskKey].isCompleted;
      });
    }

    case "UpdateTaskName": {
      const todoListKey = action.todoListKey;
      const taskKey = action.taskKey;
      const newName = action.name;
      return produce((draft) => {
        draft[todoListKey].tasks[taskKey].name = newName;
      });
    }

    case "DeleteTask": {
      const todoListKey = action.todoListKey;
      const taskKey = action.taskKey;
      return produce((draft) => {
        delete draft[todoListKey].tasks[taskKey];
      });
    }

    default:
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
}

const TodoListsPrimitiveAtom = atom<TodoListsType>({});

export const TodoListsAtom = atom<TodoListsType, ActionType[], void>(
  (get) => get(TodoListsPrimitiveAtom),
  (get, set, action) => {
    const state = get(TodoListsPrimitiveAtom);
    const nextState = reducer(state, action);
    set(TodoListsPrimitiveAtom, nextState);
  }
);
