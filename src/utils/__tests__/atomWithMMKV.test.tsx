import { Provider, useAtomValue } from "jotai";
import { atomWithMMKV } from "../atomWithMMKV";
import { cleanup, renderHook } from "@testing-library/react-native";

describe("atomWithMMKV", () => {
  afterEach(() => {
    cleanup();
  });

  it("should add a key-value pair and read it", () => {
    const myTestAtom = atomWithMMKV("foe", "bar");

    const wrapper = ({ children }: any) => <Provider>{children}</Provider>;
    const { result } = renderHook(() => useAtomValue(myTestAtom), { wrapper });

    const myTest = result.current;

    expect(myTest).toBe("bar");
  });
});
