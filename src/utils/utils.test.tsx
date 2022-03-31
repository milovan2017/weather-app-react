import {
  getAvgTemp,
  unixTimeToWeekDayNum,
  unixTimeToMonth,
  unixTimeToYear,
  rgbString,
} from "./index";

describe("utils/index.tsx", () => {
  describe("getAvgTemp", () => {
    it("returns the avg value of two numbers", () => {
      expect(getAvgTemp(2, 4)).toEqual(3);
    });

    it("returns date from a unix time datestamp", () => {
      const mockTimestamp = 1648745876; //31.March.2022.
      expect(unixTimeToWeekDayNum(mockTimestamp)).toEqual("31");
    });

    it("returns short format month name from a unix time datestamp", () => {
      const mockTimestamp = 1648745876; //31.March.2022.
      expect(unixTimeToMonth(mockTimestamp)).toEqual("Mar");
    });

    it("returns year from a unix time datestamp", () => {
      const mockTimestamp = 1648745876; //31.March.2022.
      expect(unixTimeToYear(mockTimestamp)).toEqual("2022");
    });

    it("returns a string with from a range in unix datestamp", () => {
      const r = 100;
      const g = 200;
      const b = 250;
      expect(rgbString(r, g, b)).toEqual("rgb(100,200,250)");
    });
  });
});
