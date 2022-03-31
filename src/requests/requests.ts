import axios, { AxiosResponse } from "axios";
import { transformWeatherResponse } from "../utils";
import { WeatherRequest } from "../types";

const config = {
  validateStatus: function (status: number) {
    return status >= 200 && status < 400;
  },
};

export const getShortcodes = async () => {
  const url = "https://flagcdn.com/en/codes.json";
  try {
    const response: AxiosResponse<object> = await axios.get(url, { ...config });
    const mappedShortCodes = Object.keys(response.data);
    return mappedShortCodes;
  } catch (error) {
    throw error;
  }
};

export const getWeather = async (url: string) => {
  try {
    const response: AxiosResponse<WeatherRequest> = await axios.get(url, {
      ...config,
    });
    const transformedWeatherData = transformWeatherResponse(response);
    return transformedWeatherData;
  } catch (error) {
    throw error;
  }
};
