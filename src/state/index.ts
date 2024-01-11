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
      type: "UpdateTodoListName";
      todoListKey: string;
      todoListName: string;
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
    }
  | {
      type: "DeleteTodoList";
      todoListKey: string;
    };

type ReducerType = (
  state: TodoListsType,
  action: ActionType
) => {
  nextState: TodoListsType;
  lastCreatedTodoListKey?: string;
};

const reducer: ReducerType = (state: TodoListsType, action: ActionType) => {
  switch (action.type) {
    case "SeedTodoLists": {
      const nextState = {
        todoListKey0: {
          name: "My Tasks",
          tasks: {
            key0: { name: "Call mom", isCompleted: false },
            key1: { name: "Do laundry", isCompleted: false },
            key2: { name: "Write a letter to grandma", isCompleted: false },
            key3: { name: "Check emails", isCompleted: true },
          },
        },
        todoListKey1: {
          name: "Holidays",
          tasks: {
            key0: { name: "Book a hotel", isCompleted: true },
            key1: { name: "Go to the beach", isCompleted: false },
            key2: { name: "Buy sunglasses", isCompleted: false },
            key3: { name: "Turn off my phone", isCompleted: true },
          },
        },
        todoListKey2: {
          name: "Project",
          tasks: {
            key0: { name: "Make a todo list", isCompleted: true },
            key1: { name: "Write the report", isCompleted: false },
            key2: { name: "Prepare the meeting", isCompleted: false },
            key3: { name: "Brainstorm", isCompleted: true },
          },
        },
      } as TodoListsType;
      return { nextState };
    }

    case "AddNewTodoList": {
      const todoListUUID = uuid.v4() as string;
      const nextState = produce(state, (draft) => {
        draft[todoListUUID] = { name: "New Todo List", tasks: {} };
      });
      return { nextState, lastCreatedTodoListKey: todoListUUID };
    }

    case "AddNewTask": {
      const todoListKey = action.todoListKey;
      const taskUUID = uuid.v4() as string;
      const nextState = produce(state, (draft) => {
        draft[todoListKey].tasks[taskUUID] = {
          name: "New Task",
          isCompleted: false,
        };
      });
      return { nextState };
    }

    case "UpdateTodoListName": {
      const todoListKey = action.todoListKey;
      const newName = action.todoListName;
      const nextState = produce(state, (draft) => {
        draft[todoListKey].name = newName;
      });
      return { nextState };
    }

    case "ToggleTaskIsCompleted": {
      const todoListKey = action.todoListKey;
      const taskKey = action.taskKey;
      const nextState = produce(state, (draft) => {
        draft[todoListKey].tasks[taskKey].isCompleted =
          !draft[todoListKey].tasks[taskKey].isCompleted;
      });
      return { nextState };
    }

    case "UpdateTaskName": {
      const todoListKey = action.todoListKey;
      const taskKey = action.taskKey;
      const newName = action.name;
      const nextState = produce(state, (draft) => {
        draft[todoListKey].tasks[taskKey].name = newName;
      });
      return { nextState };
    }

    case "DeleteTask": {
      const todoListKey = action.todoListKey;
      const taskKey = action.taskKey;
      const nextState = produce(state, (draft) => {
        delete draft[todoListKey].tasks[taskKey];
      });
      return { nextState };
    }

    case "DeleteTodoList": {
      const todoListKey = action.todoListKey;
      const nextState = produce(state, (draft) => {
        delete draft[todoListKey];
      });
      return { nextState };
    }

    default:
      const _exhaustiveCheck: never = action;
      return { nextState: state };
  }
};

export const TodoListsPrimitiveAtom = atom<TodoListsType>({});

export const lastCreatedTodoListKeyAtom = atom("");

//TODO implement the atom, write tests before
// i think reducer should return an object

export const TodoListsAtom = atom<TodoListsType, ActionType[], void>(
  (get) => get(TodoListsPrimitiveAtom),
  (get, set, action) => {
    const state = get(TodoListsPrimitiveAtom);
    const changes = reducer(state, action);
    const nextState = changes.nextState;
    set(TodoListsPrimitiveAtom, nextState);
    if (changes.lastCreatedTodoListKey) {
      set(lastCreatedTodoListKeyAtom, changes.lastCreatedTodoListKey);
    }
  }
);
