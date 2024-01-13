import { act, cleanup, renderHook } from "@testing-library/react-native";
import { Provider, useAtom, useAtomValue } from "jotai";
import { TodoListsAtom } from "@/state";
import { currentTodoListKeyAtom } from "@/state/ui";

describe("UI state ", () => {
  afterEach(() => {
    cleanup();
  });

  it("should set a default current todo list when it is not set", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
    const { result } = renderHook(
      () => ({
        todoLists: useAtom(TodoListsAtom),
        currentTodoListKey: useAtomValue(currentTodoListKeyAtom),
      }),
      { wrapper }
    );

    const [, setTodoLists] = result.current.todoLists;

    let currentTodoListKey = result.current.currentTodoListKey;

    expect(currentTodoListKey).toEqual("");

    act(() => {
      setTodoLists({ type: "AddNewTodoList" });
    });

    let [todoLists] = result.current.todoLists;

    const todoListKey = Object.keys(todoLists)[0];

    currentTodoListKey = result.current.currentTodoListKey;

    expect(currentTodoListKey).toBe(todoListKey);
  });

  it("should set a new current todo list when deleting a todo list", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
    const { result } = renderHook(
      () => ({
        todoLists: useAtom(TodoListsAtom),
        currentTodoListKey: useAtom(currentTodoListKeyAtom),
      }),
      { wrapper }
    );

    const [, setTodoLists] = result.current.todoLists;

    act(() => {
      setTodoLists({ type: "AddNewTodoList" });
      setTodoLists({ type: "AddNewTodoList" });
    });

    let [todoLists] = result.current.todoLists;

    const firstTodoListKey = Object.keys(todoLists)[0];
    const secondTodoListKey = Object.keys(todoLists)[1];

    const [, setCurrentTodoListKey] = result.current.currentTodoListKey;

    act(() => {
      setCurrentTodoListKey(secondTodoListKey);
    });

    let [currentTodoListKey] = result.current.currentTodoListKey;

    expect(currentTodoListKey).toBe(secondTodoListKey);

    act(() => {
      setTodoLists({ type: "DeleteTodoList", todoListKey: secondTodoListKey });
    });

    [currentTodoListKey] = result.current.currentTodoListKey;

    expect(currentTodoListKey).toBe(firstTodoListKey);
  });
});
