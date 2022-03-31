import React, { useState } from "react";
import { Col, Button, InputGroup, Form } from "react-bootstrap";
import { CountryDropdown } from "../CountryDropdown/CountryDropdown";
import "./SearchCity.css";
import { getUrl } from "../../utils/index";
import { initialConfig } from "../../config";

interface ISearchCityProps {
  apiInProgress: boolean;
  shortcodes: string[];
  submitWeatherRequest: (url: string) => void;
}

const SearchCity: React.FC<ISearchCityProps> = ({
  shortcodes,
  submitWeatherRequest,
  apiInProgress,
}) => {
  const [countryCode, setCountryCode] = useState(initialConfig.countryCode);
  const [cityName, setCityName] = useState("");
  const [inputError, setInputError] = useState(false);
  const numberOfDays = initialConfig.numberOfDays;

  const checkInput = () => {
    if (cityName === "") {
      setInputError(true);
    } else {
      const url = getUrl(cityName, countryCode, numberOfDays);
      submitWeatherRequest(url);
    }
  };

  return (
    <Col md={{ span: 6, offset: 3 }} className="searchCont mb-3">
      <Form>
        <InputGroup>
          <div className="btn btn-outline-secondary countryImgCont">
            <img src={`/flags/${countryCode}.png`} alt="" />
          </div>
          <CountryDropdown
            shortcodes={shortcodes}
            setCountryCode={(code) => setCountryCode(code)}
            countryCode={countryCode}
          ></CountryDropdown>
          <input
            type="text"
            className={`text-muted form-control ${
              inputError && "border-danger"
            }`}
            id="cityName"
            placeholder="Please enter your location..."
            onChange={(e) => {
              setCityName(e.target.value);
              setInputError(false);
            }}
            defaultValue={cityName}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={checkInput}
            disabled={apiInProgress}
          >
            <img src="/img/search.png" alt="search"></img>
          </Button>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default SearchCity;
