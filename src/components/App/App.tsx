import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchCity from "../SearchCity";
import DisplayWeather from "../DisplayWeather";
import { ImgCanvas } from "../CanvasImg/CanvasImg";
import { getShortcodes, getWeather } from "../../requests/requests";
import { initialConfig } from "../../config";
import { WeatherData } from "../../types";

const App: React.FC = () => {
  const [shortcodes, setShortcodes] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    header: { headerDate: "", avgTemp: 0 },
    datesList: [],
  });
  const [backgroundRgb, setBackgroundRgb] = useState(
    initialConfig.bottomRightRgb
  );
  const [searchError, setSearchError] = useState(false);
  const [codesError, setCodesError] = useState(false);
  const [apiInProgress, setApiInProgress] = useState(false);

  const fetchShortcodes = async () => {
    try {
      const response = await getShortcodes();
      setShortcodes(response);
      setCodesError(false);
    } catch (error) {
      setCodesError(true);
    }
  };

  const submitWeatherRequest = async (url: string) => {
    setApiInProgress(true);
    try {
      const response = await getWeather(url);
      setWeatherData(response);
      setSearchError(false);
    } catch (error) {
      setSearchError(true);
    }
    setApiInProgress(false);
  };

  useEffect(() => {
    fetchShortcodes();
  }, []);

  return (
    <Container
      fluid
      className="weather-cont d-flex"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${initialConfig.topLeftRgb}, ${backgroundRgb} )`,
      }}
    >
      <Row className="my-auto w-100">
        {codesError ? (
          <span className="text-center text-muted">
            Error getting country shortcodes.
          </span>
        ) : (
          <SearchCity
            submitWeatherRequest={(url) => submitWeatherRequest(url)}
            shortcodes={shortcodes}
            apiInProgress={apiInProgress}
          ></SearchCity>
        )}

        {searchError && (
          <span className="text-center text-muted">No results</span>
        )}

        {weatherData.datesList.length !== 0 && (
          <>
            <DisplayWeather weatherData={weatherData}></DisplayWeather>
            <ImgCanvas
              avgTemp={weatherData.header.avgTemp}
              setRgb={(color) => setBackgroundRgb(color)}
            ></ImgCanvas>
          </>
        )}
      </Row>
    </Container>
  );
};

export default App;
