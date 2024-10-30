import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { useResultSummary } from "../../modules/ResultSummary/useResultSummary";

global.fetch = jest.fn();

// Mock data for the test
const mockData = [
  { category: "Reaction", score: 80, icon: "/icons/reaction.svg" },
  { category: "Memory", score: 90, icon: "/icons/memory.svg" },
  { category: "Verbal", score: 85, icon: "/icons/verbal.svg" },
  { category: "Visual", score: 70, icon: "/icons/visual.svg" },
];

describe("useResultSummary", () => {
  beforeEach(() => {
    // Mock the fetch API with a loading delay
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              json: () => Promise.resolve(mockData),
            });
          }, 500); // 500ms delay to simulate loading
        })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data and calculate the total score", async () => {
    const { result } = renderHook(() => useResultSummary());
    console.log("result", result);
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    // Verify loading is initially true
    expect(result.current.loading).toBe(true);

    // Wait for loading to finish
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify data is correctly set
    expect(result.current.data).toEqual(mockData);

    // Verify totalScore is calculated correctly
    const expectedTotalScore =
      mockData.reduce((acc, item) => acc + item.score, 0) / mockData.length;
    expect(result.current.totalScore).toBe(expectedTotalScore);
  });

  it("should handle fetch error and set loading to false", async () => {
    // Mock fetch to throw an error
    global.fetch = jest.fn(() => Promise.reject("Fetch error"));

    const { result } = renderHook(() => useResultSummary());

    // Verify loading is initially true
    expect(result.current.loading).toBe(true);

    // Wait for loading to finish
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify data is empty and totalScore is 0 on error
    expect(result.current.data).toEqual([]);
    expect(result.current.totalScore).toBe(0);
  });
});
