import {
  renderHook,
  act,
  cleanup,
  render,
} from "@testing-library/react-native";
import useTasks from "../useTasks";

describe("useTasks", () => {
  afterAll(() => {
    cleanup();
  });

  it("should return the initial value for tasks", () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual({});
  });

  it("should accept new tasks", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask();
    });

    expect(Object.keys(result.current.tasks).length).toBe(1);

    const singleTaskKey = Object.keys(result.current.tasks)[0];
    const taskToMatch = {
      name: "test",
      isCompleted: false,
    };

    expect(result.current.tasks[singleTaskKey]).toMatchObject(taskToMatch);

    act(() => {
      result.current.addTask();
    });

    expect(Object.keys(result.current.tasks).length).toBe(2);

    const twoTasksKeys = Object.keys(result.current.tasks);

    expect(result.current.tasks[twoTasksKeys[0]]).toMatchObject(taskToMatch);
    expect(result.current.tasks[twoTasksKeys[1]]).toMatchObject(taskToMatch);
  });

  it("should update isCompleted property", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask();
    });

    const taskKey = Object.keys(result.current.tasks)[0];

    act(() => {
      result.current.toggleTaskIsCompleted(taskKey);
    });

    expect(result.current.tasks[taskKey].isCompleted).toBe(true);

    act(() => {
      result.current.toggleTaskIsCompleted(taskKey);
    });

    expect(result.current.tasks[taskKey].isCompleted).toBe(false);
  });

  it("should change the name of a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask();
    });

    const taskKey = Object.keys(result.current.tasks)[0];

    act(() => {
      result.current.updateTaskName(taskKey, "Testing my task");
    });

    expect(result.current.tasks[taskKey].name).toBe("Testing my task");
  });
});
