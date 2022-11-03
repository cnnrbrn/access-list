import { weekIsEmpty } from "../classModules";

describe("classModules helpers", () => {
  test("weekIsEmpty returns true if passed an empty string or string containing only spaces", () => {
    expect(weekIsEmpty(" s")).toBeTruthy();
  });
});
