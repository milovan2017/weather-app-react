import DisplayWeather from "./DisplayWeather";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

const mockDisplayWeatherData = {
  header: {
    headerDate: "Mar 31 - Apr 6 2022",
    avgTemp: 38,
  },
  datesList: [
    {
      day: "",
      averageTemp: 0,
    },
  ],
};

describe("DisplayWeather.tsx", () => {
  it("renders DisplayWeather without crashing", () => {
    const { container } = render(
      <DisplayWeather weatherData={mockDisplayWeatherData} />
    );
    expect(container).toMatchSnapshot();
  });

  it("contains date info in the header", () => {
    const { container } = render(
      <DisplayWeather weatherData={mockDisplayWeatherData} />
    );
    expect(container.textContent).toContain(
      mockDisplayWeatherData.header.headerDate
    );
  });

  it("contains average temperature info", () => {
    const { container } = render(
      <DisplayWeather weatherData={mockDisplayWeatherData} />
    );
    expect(container.textContent).toContain(
      mockDisplayWeatherData.header.avgTemp.toString()
    );
  });
});
