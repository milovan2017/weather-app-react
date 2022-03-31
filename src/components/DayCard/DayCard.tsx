import React from "react";
import { DayData } from "../../types";
import { Col } from "react-bootstrap";

interface IDayCardProps {
  dayInfo: DayData;
}

export const DayCard: React.FC<IDayCardProps> = ({ dayInfo }) => {
  return (
    <Col className="p-0 text-center">
      <span className="text-muted">{dayInfo.day}</span>
      <h2 className="text-light">{dayInfo.averageTemp}°</h2>
    </Col>
  );
};
