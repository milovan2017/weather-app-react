import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { DayCard } from "../DayCard/DayCard";
import { WeatherData } from "../../types";
import "./displayWeather.css";

interface IDisplayWeatherProps {
  weatherData?: WeatherData;
}

const DisplayWeather: React.FC<IDisplayWeatherProps> = ({ weatherData }) => {
  return (
    <>
      <div className="weatherCont">
        {weatherData ? (
          <>
            <Col
              md={{ span: 2, offset: 5 }}
              mt={2}
              className="headerCont text-center"
            >
              <Card>
                <Card.Body>
                  <Card.Title className="text-muted">
                    {weatherData?.header.headerDate}
                  </Card.Title>
                  <h1 className="text-light">{weatherData.header.avgTemp}°</h1>
                </Card.Body>
              </Card>
            </Col>
            <Col md={{ span: 6, offset: 3 }} mt={2}>
              <Row>
                {weatherData?.datesList.map((dayInfo, index) => {
                  return (
                    <React.Fragment key={index}>
                      <DayCard dayInfo={dayInfo} />
                    </React.Fragment>
                  );
                })}
              </Row>
            </Col>
          </>
        ) : (
          <Col className="text-center">No Data</Col>
        )}
      </div>
    </>
  );
};

export default DisplayWeather;
