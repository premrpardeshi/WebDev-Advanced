import { describe, expect, test, it } from "@jest/globals";
import { multiply, sum } from "../index";

describe("testing sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("testing multiply", () => {
  it("should multiply 2 and 4 correctly", () => {
    expect(multiply(2, 4)).toBe(8);
  });

  it("should multiply decimals correctly", () => {
    expect(multiply(5, 0.2)).toBe(1);
  });
});
