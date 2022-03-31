import { CountryDropdown } from "./CountryDropdown";
import { render, cleanup, screen } from "@testing-library/react";

afterEach(cleanup);

const mockShortcodes = ["rs", "ru", "gr"];
const mockCountrycode = "rs";

describe("CountryDropdown.tsx", () => {
  it("renders DisplayWeather without crashing", () => {
    const { container } = render(
      <CountryDropdown
        shortcodes={mockShortcodes}
        countryCode={mockCountrycode}
        setCountryCode={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should display the correct number of options", () => {
    render(
      <CountryDropdown
        shortcodes={mockShortcodes}
        countryCode={mockCountrycode}
        setCountryCode={jest.fn()}
      />
    );
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(mockShortcodes.length);
  });
});
