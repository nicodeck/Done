import { atom } from "jotai";
import { TodoListsAtom } from ".";

const currentTodoListKeyPrimitiveAtom = atom("");

export const currentTodoListKeyAtom = atom(
  (get) => {
    const currentTodoListKey = get(currentTodoListKeyPrimitiveAtom);
    const todoLists = get(TodoListsAtom);
    if (currentTodoListKey == "") {
      if (Object.keys(todoLists).length == 0) {
        return "";
      }
      const firstTodoListKey = Object.keys(todoLists)[0];
      return firstTodoListKey;
    } else {
      if (currentTodoListKey in todoLists) return currentTodoListKey;
      const firstTodoListKey = Object.keys(todoLists)[0];
      return firstTodoListKey;
    }
  },
  (get, set, update: string) => set(currentTodoListKeyPrimitiveAtom, update)
);
