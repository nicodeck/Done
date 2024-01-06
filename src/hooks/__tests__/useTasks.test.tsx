import { renderHook, act, cleanup } from "@testing-library/react-native";
import { Provider } from "jotai";
import useTasks from "../useTasks";

describe("useTasks", () => {
  afterEach(() => {
    cleanup();
  });

  it("should return the initial value for todoLists", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;

    const { result } = renderHook(() => useTasks(), { wrapper });

    expect(result.current.todoLists).toEqual({});
  });

  it("should fill todoLists with fillTodoLists", () => {
    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;

    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.fillTodoLists();
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

    expect(result.current.todoLists).toMatchObject(todoListsToMatch);
  });

  /* Single todo list */

  describe("single todo list", () => {
    afterEach(() => {
      cleanup();
    });

    it("should create a new todo list", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
      const { result } = renderHook(() => useTasks(), { wrapper });

      console.log(result.current.todoLists);

      act(() => {
        result.current.addTodoList("New Todo List");
      });
      expect(Object.keys(result.current.todoLists).length).toBe(1);

      const todoListKey = Object.keys(result.current.todoLists)[0];
      const newTodoList = result.current.todoLists[todoListKey];

      const todoListToMatch = {
        name: "New Todo List",
        tasks: {},
      };

      expect(newTodoList).toMatchObject(todoListToMatch);
    });

    it("should accept new tasks", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
      const { result } = renderHook(() => useTasks(), { wrapper });

      act(() => {
        result.current.addTodoList("New Todo List");
      });

      const todoListKey = Object.keys(result.current.todoLists)[0];

      act(() => {
        result.current.addTask(todoListKey);
      });

      expect(
        Object.keys(result.current.todoLists[todoListKey].tasks).length
      ).toBe(1);

      const singleTaskKey = Object.keys(
        result.current.todoLists[todoListKey].tasks
      )[0];

      const taskToMatch = {
        name: "New Task",
        isCompleted: false,
      };

      expect(
        result.current.todoLists[todoListKey].tasks[singleTaskKey]
      ).toMatchObject(taskToMatch);

      act(() => {
        result.current.addTask(todoListKey);
      });

      expect(
        Object.keys(result.current.todoLists[todoListKey].tasks).length
      ).toBe(2);

      const twoTasksKeys = Object.keys(
        result.current.todoLists[todoListKey].tasks
      );

      expect(
        result.current.todoLists[todoListKey].tasks[twoTasksKeys[0]]
      ).toMatchObject(taskToMatch);
      expect(
        result.current.todoLists[todoListKey].tasks[twoTasksKeys[1]]
      ).toMatchObject(taskToMatch);
    });

    it("should update isCompleted property", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
      const { result } = renderHook(() => useTasks(), { wrapper });

      act(() => {
        result.current.addTodoList("New Todo List");
      });

      const todoListKey = Object.keys(result.current.todoLists)[0];

      act(() => {
        result.current.addTask(todoListKey);
      });

      expect(
        Object.keys(result.current.todoLists[todoListKey].tasks).length
      ).toBe(1);

      const singleTaskKey = Object.keys(
        result.current.todoLists[todoListKey].tasks
      )[0];

      act(() => {
        result.current.toggleTaskIsCompleted(todoListKey, singleTaskKey);
      });

      expect(
        result.current.todoLists[todoListKey].tasks[singleTaskKey].isCompleted
      ).toBe(true);

      act(() => {
        result.current.toggleTaskIsCompleted(todoListKey, singleTaskKey);
      });

      expect(
        result.current.todoLists[todoListKey].tasks[singleTaskKey].isCompleted
      ).toBe(false);
    });

    it("should change the name of a task", () => {
      const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
      const { result } = renderHook(() => useTasks(), { wrapper });

      act(() => {
        result.current.addTodoList("New Todo List");
      });

      const todoListKey = Object.keys(result.current.todoLists)[0];

      act(() => {
        result.current.addTask(todoListKey);
      });

      expect(
        Object.keys(result.current.todoLists[todoListKey].tasks).length
      ).toBe(1);

      const singleTaskKey = Object.keys(
        result.current.todoLists[todoListKey].tasks
      )[0];

      act(() => {
        result.current.updateTaskName(
          todoListKey,
          singleTaskKey,
          "Testing my task"
        );
      });

      expect(
        result.current.todoLists[todoListKey].tasks[singleTaskKey].name
      ).toBe("Testing my task");
    });
  });
});
