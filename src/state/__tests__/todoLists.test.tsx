import { renderHook, act, cleanup } from "@testing-library/react-native";
import { Provider, useAtom, useAtomValue } from "jotai";
import { TodoListsAtom } from "@/state";

describe("useTasks", () => {
  afterEach(() => {
    cleanup();
  });

  it("should return the initial value for todoLists", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;

    const { result } = renderHook(() => useAtomValue(TodoListsAtom), {
      wrapper,
    });
    const todoLists = result.current;

    expect(todoLists).toEqual({});
  });

  it("should fill todoLists with fillTodoLists", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;

    const { result } = renderHook(() => useAtom(TodoListsAtom), {
      wrapper,
    });

    const [, setTodoLists] = result.current;

    act(() => {
      setTodoLists({ type: "fill" });
    });

    const todoListsToMatch = {
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
    const [todoLists] = result.current;

    expect(todoLists).toMatchObject(todoListsToMatch);
  });
});
