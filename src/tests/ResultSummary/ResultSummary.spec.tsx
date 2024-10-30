import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { ResultSummary } from "../../modules/ResultSummary/ResultSummary";
import { useResultSummary } from "../../modules/ResultSummary/useResultSummary";

global.fetch = jest.fn();

// Mock the useResultSummary hook
jest.mock("../../modules/ResultSummary/useResultSummary");

describe("ResultSummary Component", () => {
  const mockData = [
    {
      category: "Reaction",
      score: 80,
      icon: "./assets/images/icon-reaction.svg",
    },
    { category: "Memory", score: 92, icon: "./assets/images/icon-memory.svg" },
    { category: "Verbal", score: 61, icon: "./assets/images/icon-verbal.svg" },
    { category: "Visual", score: 72, icon: "./assets/images/icon-visual.svg" },
  ];

  it("displays the loading spinner while data is loading", () => {
    (useResultSummary as jest.Mock).mockReturnValue({
      totalScore: 0,
      loading: true,
      data: [],
    });

    render(<ResultSummary />);

    // Expect to see the loading spinner
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays the score and summary list once data is loaded", async () => {
    const totalScore =
      mockData.reduce((acc, item) => acc + item.score, 0) / mockData.length;

    (useResultSummary as jest.Mock).mockReturnValue({
      totalScore,
      loading: false,
      data: mockData,
    });

    render(<ResultSummary />);

    // Wait for the loading state to disappear
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());

    // Check for rounded score display
    expect(
      screen.getByText(Math.round(totalScore).toString())
    ).toBeInTheDocument();

    // Verify each category is displayed
    mockData.forEach((item) => {
      expect(screen.getByText(item.category)).toBeInTheDocument();
    });
  });
});
