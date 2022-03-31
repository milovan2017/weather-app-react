import React from "react";
import { Form } from "react-bootstrap";

interface ICountryDropdownProps {
  shortcodes: string[];
  setCountryCode: (code: string) => void;
  countryCode: string;
}

export const CountryDropdown: React.FC<ICountryDropdownProps> = ({
  shortcodes,
  setCountryCode,
  countryCode,
}) => {
  return (
    <>
      <Form.Select
        className="text-muted"
        onChange={(e) => {
          setCountryCode(e.target.value);
        }}
        value={countryCode}
        name="countrycodes"
      >
        {shortcodes.map((code, index) => (
          <option key={index} value={code}>
            {code}
          </option>
        ))}
      </Form.Select>
    </>
  );
};
