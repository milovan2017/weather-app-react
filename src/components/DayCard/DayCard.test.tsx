import React from "react";
import { DayCard } from "./DayCard";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

const mockDayData = {
  day: "Wednesday",
  averageTemp: 12,
};

describe("DayCard.tsx", () => {
  it("renders DayCard without crashing", () => {
    const { container } = render(<DayCard dayInfo={mockDayData} />);
    expect(container).toMatchSnapshot();
  });

  it("contains day info", () => {
    const { container } = render(<DayCard dayInfo={mockDayData} />);
    expect(container.textContent).toContain(mockDayData.day.toString());
  });

  it("contains average temperature info", () => {
    const { container } = render(<DayCard dayInfo={mockDayData} />);
    expect(container.textContent).toContain(mockDayData.averageTemp.toString());
  });
});
