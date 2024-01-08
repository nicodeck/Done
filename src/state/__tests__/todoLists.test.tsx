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
      setTodoLists({ type: "SeedTodoLists" });
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

  /* Single todo list */

  describe("single todo list", () => {
    afterEach(() => {
      cleanup();
    });

    it("should create a new todo list", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;

      const { result } = renderHook(() => useAtom(TodoListsAtom), { wrapper });

      const [, setTodoLists] = result.current;

      act(() => {
        setTodoLists({ type: "AddNewTodoList" });
      });

      let [todoLists] = result.current;

      expect(Object.keys(todoLists).length).toBe(1);

      const todoListKey = Object.keys(todoLists)[0];
      const newTodoList = todoLists[todoListKey];

      const todoListToMatch = {
        name: "New Todo List",
        tasks: {},
      };

      expect(newTodoList).toMatchObject(todoListToMatch);
    });

    it("should accept new tasks", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
      const { result } = renderHook(() => useAtom(TodoListsAtom), { wrapper });

      const [, setTodoLists] = result.current;

      act(() => {
        setTodoLists({ type: "AddNewTodoList" });
      });

      let [todoLists] = result.current;

      const todoListKey = Object.keys(todoLists)[0];

      act(() => {
        setTodoLists({ type: "AddNewTask", todoListKey: todoListKey });
      });

      [todoLists] = result.current;

      expect(Object.keys(todoLists[todoListKey].tasks).length).toBe(1);

      const singleTaskKey = Object.keys(todoLists[todoListKey].tasks)[0];

      const taskToMatch = {
        name: "New Task",
        isCompleted: false,
      };

      expect(todoLists[todoListKey].tasks[singleTaskKey]).toMatchObject(
        taskToMatch
      );

      act(() => {
        setTodoLists({ type: "AddNewTask", todoListKey: todoListKey });
      });

      [todoLists] = result.current;

      expect(Object.keys(todoLists[todoListKey].tasks).length).toBe(2);

      const twoTasksKeys = Object.keys(todoLists[todoListKey].tasks);

      expect(todoLists[todoListKey].tasks[twoTasksKeys[0]]).toMatchObject(
        taskToMatch
      );
      expect(todoLists[todoListKey].tasks[twoTasksKeys[1]]).toMatchObject(
        taskToMatch
      );
    });

    it("should update isCompleted property", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
      const { result } = renderHook(() => useAtom(TodoListsAtom), { wrapper });

      const [, setTodoLists] = result.current;

      act(() => {
        setTodoLists({ type: "AddNewTodoList" });
      });

      let [todoLists] = result.current;

      const todoListKey = Object.keys(todoLists)[0];

      act(() => {
        setTodoLists({ type: "AddNewTask", todoListKey: todoListKey });
      });

      [todoLists] = result.current;

      expect(Object.keys(todoLists[todoListKey].tasks).length).toBe(1);

      const singleTaskKey = Object.keys(todoLists[todoListKey].tasks)[0];

      act(() => {
        setTodoLists({
          type: "ToggleTaskIsCompleted",
          todoListKey: todoListKey,
          taskKey: singleTaskKey,
        });
      });

      [todoLists] = result.current;

      expect(todoLists[todoListKey].tasks[singleTaskKey].isCompleted).toBe(
        true
      );

      act(() => {
        setTodoLists({
          type: "ToggleTaskIsCompleted",
          todoListKey: todoListKey,
          taskKey: singleTaskKey,
        });
      });

      [todoLists] = result.current;

      expect(todoLists[todoListKey].tasks[singleTaskKey].isCompleted).toBe(
        false
      );
    });

    it("should change the name of a task", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
      const { result } = renderHook(() => useAtom(TodoListsAtom), { wrapper });

      const [, setTodoLists] = result.current;

      act(() => {
        setTodoLists({ type: "AddNewTodoList" });
      });

      let [todoLists] = result.current;

      const todoListKey = Object.keys(todoLists)[0];

      act(() => {
        setTodoLists({ type: "AddNewTask", todoListKey: todoListKey });
      });

      [todoLists] = result.current;

      expect(Object.keys(todoLists[todoListKey].tasks).length).toBe(1);

      const singleTaskKey = Object.keys(todoLists[todoListKey].tasks)[0];

      act(() => {
        setTodoLists({
          type: "UpdateTaskName",
          todoListKey: todoListKey,
          taskKey: singleTaskKey,
          name: "Testing my task",
        });
      });

      [todoLists] = result.current;

      expect(todoLists[todoListKey].tasks[singleTaskKey].name).toBe(
        "Testing my task"
      );
    });
  });
});
