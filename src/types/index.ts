export interface DayData {
  day: String;
  averageTemp: Number;
}

export interface WeatherData {
  header: {
    headerDate: string;
    avgTemp: number;
  };
  datesList: DayData[];
}

export interface WeatherRequest {
  list: List[];
}

interface List {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
}
