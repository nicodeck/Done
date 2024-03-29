import { renderHook, act, cleanup } from "@testing-library/react-native";
import { Provider, useAtom, useAtomValue } from "jotai";
import {
  TodoListsAtom,
  lastCreatedTodoListKeyAtom,
  lastCreatedTaskKeyAtom,
} from "@/state";

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
    };
    const [todoLists] = result.current;

    expect(todoLists).toMatchObject(todoListsToMatch);
  });

  it("should create a new todo list", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;

    const { result } = renderHook(
      () => ({
        todoLists: useAtom(TodoListsAtom),
        lastCreatedTodoListKey: useAtom(lastCreatedTodoListKeyAtom),
      }),
      { wrapper }
    );

    const [, setTodoLists] = result.current.todoLists;

    act(() => {
      setTodoLists({ type: "AddNewTodoList" });
    });

    let [todoLists] = result.current.todoLists;

    expect(Object.keys(todoLists).length).toBe(1);

    const todoListKey = Object.keys(todoLists)[0];
    const newTodoList = todoLists[todoListKey];

    const todoListToMatch = {
      name: "New Todo List",
      tasks: {},
    };

    expect(newTodoList).toMatchObject(todoListToMatch);

    const [lastCreatedTodoListKey] = result.current.lastCreatedTodoListKey;

    expect(lastCreatedTodoListKey).toBe(todoListKey);
  });

  it("should change the name of a todo list", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
    const { result } = renderHook(() => useAtom(TodoListsAtom), { wrapper });

    const [, setTodoLists] = result.current;

    act(() => {
      setTodoLists({ type: "AddNewTodoList" });
    });

    let [todoLists] = result.current;

    const todoListKey = Object.keys(todoLists)[0];

    act(() => {
      setTodoLists({
        type: "UpdateTodoListName",
        todoListKey: todoListKey,
        todoListName: "My New Name",
      });
    });
    [todoLists] = result.current;

    const newTodoListName = todoLists[todoListKey].name;

    expect(newTodoListName).toBe("My New Name");
  });

  it("should create new tasks", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
    const { result } = renderHook(
      () => ({
        todoLists: useAtom(TodoListsAtom),
        lastCreatedTaskKey: useAtom(lastCreatedTaskKeyAtom),
      }),
      { wrapper }
    );

    const [, setTodoLists] = result.current.todoLists;

    act(() => {
      setTodoLists({ type: "AddNewTodoList" });
    });

    let [todoLists] = result.current.todoLists;

    const todoListKey = Object.keys(todoLists)[0];

    act(() => {
      setTodoLists({ type: "AddNewTask", todoListKey: todoListKey });
    });

    [todoLists] = result.current.todoLists;

    expect(Object.keys(todoLists[todoListKey].tasks).length).toBe(1);

    const singleTaskKey = Object.keys(todoLists[todoListKey].tasks)[0];

    let [lastCreatedTaskKey] = result.current.lastCreatedTaskKey;

    expect(lastCreatedTaskKey).toBe(singleTaskKey);

    const taskToMatch = {
      name: "",
      isCompleted: false,
    };

    expect(todoLists[todoListKey].tasks[singleTaskKey]).toMatchObject(
      taskToMatch
    );

    act(() => {
      setTodoLists({ type: "AddNewTask", todoListKey: todoListKey });
    });

    [todoLists] = result.current.todoLists;

    expect(Object.keys(todoLists[todoListKey].tasks).length).toBe(2);

    const twoTasksKeys = Object.keys(todoLists[todoListKey].tasks);

    [lastCreatedTaskKey] = result.current.lastCreatedTaskKey;

    expect(todoLists[todoListKey].tasks[twoTasksKeys[0]]).toMatchObject(
      taskToMatch
    );
    expect(todoLists[todoListKey].tasks[twoTasksKeys[1]]).toMatchObject(
      taskToMatch
    );

    expect(lastCreatedTaskKey).toBe(twoTasksKeys[1]);
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

    expect(todoLists[todoListKey].tasks[singleTaskKey].isCompleted).toBe(true);

    act(() => {
      setTodoLists({
        type: "ToggleTaskIsCompleted",
        todoListKey: todoListKey,
        taskKey: singleTaskKey,
      });
    });

    [todoLists] = result.current;

    expect(todoLists[todoListKey].tasks[singleTaskKey].isCompleted).toBe(false);
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

  it("should delete a task", () => {
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

    const taskKey = Object.keys(todoLists[todoListKey].tasks)[0];

    act(() => {
      setTodoLists({
        type: "DeleteTask",
        todoListKey: todoListKey,
        taskKey: taskKey,
      });
    });

    [todoLists] = result.current;

    expect(Object.keys(todoLists[todoListKey].tasks).length).toBe(0);
  });

  it("deletes a todo list", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
    const { result } = renderHook(() => useAtom(TodoListsAtom), { wrapper });

    const [, setTodoLists] = result.current;

    act(() => setTodoLists({ type: "SeedTodoLists" }));

    let [todoLists] = result.current;

    const todoListKey = Object.keys(todoLists)[0];

    act(() =>
      setTodoLists({ type: "DeleteTodoList", todoListKey: todoListKey })
    );

    [todoLists] = result.current;

    expect(todoLists[todoListKey]).toBeUndefined();
  });
});
