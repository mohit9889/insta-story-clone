import { getTimeAgoString } from "~/utils/time";

describe("getTimeAgoString function", () => {
  it("returns the correct string for timestamps within the last hour", () => {
    const currentTimestamp = new Date();
    const pastTimestamp = new Date(currentTimestamp.getTime() - 30 * 60 * 1000); // 30 minutes ago

    expect(getTimeAgoString(pastTimestamp)).toBe("30 minutes ago");
  });

  it("returns the correct string for timestamps beyond an hour", () => {
    const currentTimestamp = new Date();
    const pastTimestamp = new Date(
      currentTimestamp.getTime() - 2 * 60 * 60 * 1000,
    ); // 2 hours ago

    expect(getTimeAgoString(pastTimestamp)).toBe("2 hours ago");
  });

  it("handles singular/plural correctly", () => {
    const currentTimestamp = new Date();
    const pastTimestamp1 = new Date(currentTimestamp.getTime() - 1 * 60 * 1000); // 1 minute ago
    const pastTimestamp2 = new Date(
      currentTimestamp.getTime() - 1 * 60 * 60 * 1000,
    ); // 1 hour ago

    expect(getTimeAgoString(pastTimestamp1)).toBe("1 minute ago");
    expect(getTimeAgoString(pastTimestamp2)).toBe("1 hour ago");
  });
});
