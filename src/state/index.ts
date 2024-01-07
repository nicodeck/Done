import { produce } from "immer";
import { PrimitiveAtom, WritableAtom, atom } from "jotai";
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

type ActionType = {
  type: "fill" | "addTodoList";
};

function reducer(state: TodoListsType, action: ActionType) {
  switch (action.type) {
    case "fill":
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
      break;
    case "addTodoList":
      const TodoListUUID = uuid.v4() as string;
      return produce(state, (draft) => {
        draft[TodoListUUID] = { name: "New Todo List", tasks: {} };
      });
      break;

    default:
      return state;
      break;
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
