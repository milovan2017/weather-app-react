export const getUrl = (city: string, country: string, days_num: number) => {
  //this should go to env file
  const api_key = "733dd13f5974fbcbbaf67ed6968b59f9";
  return `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city},${country}&units=metric&cnt=${days_num}&appid=${api_key}`;
};

export const transformWeatherResponse = (response: any) => {
  let sumOfAvgTemps = 0;
  const datesList = response.data.list.map((item: any) => {
    const dayOfTheWeek = unixTimeToWeekDay(item.dt);
    const averageTemp = getAvgTemp(item.temp.min, item.temp.max);
    sumOfAvgTemps += averageTemp;
    return {
      day: dayOfTheWeek,
      averageTemp: Math.round(averageTemp),
    };
  });

  const headerDate = buildAverageHeaderString(response.data.list);
  const avgTempHeader = Math.round(sumOfAvgTemps / 7);
  const transformedData = {
    header: {
      headerDate: headerDate,
      avgTemp: avgTempHeader,
    },
    datesList: datesList,
  };
  return transformedData;
};

export const getAvgTemp = (x: number, y: number) => (x + y) / 2;

export const unixTimeToWeekDay = (unixStamp: number) => {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(unixStamp * 1000)
  );
};

export const unixTimeToWeekDayNum = (unixStamp: number) => {
  return new Date(unixStamp * 1000).getDate().toString();
};

export const unixTimeToMonth = (unixStamp: number) => {
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(unixStamp * 1000)
  );
};

export const unixTimeToYear = (unixStamp: number) => {
  return new Date(unixStamp * 1000).getFullYear().toString();
};

export const buildAverageHeaderString = (arr: any) => {
  const firstDay = unixTimeToWeekDayNum(arr[0].dt);
  const lastDay = unixTimeToWeekDayNum(arr[arr.length - 1].dt);
  const firstMonth = unixTimeToMonth(arr[0].dt);
  const lastMonth = unixTimeToMonth(arr[arr.length - 1].dt);
  const firstYear = unixTimeToYear(arr[0].dt);
  const lastYear = unixTimeToYear(arr[arr.length - 1].dt);

  let str = "";
  if (firstMonth === lastMonth) {
    str = `${firstMonth} ${firstDay} - ${lastDay} ${firstYear}`; // if the date range is in the same month display days range and year eg.(Mar 10-17 2022.)
  } else {
    if (firstYear === lastYear) {
      str = `${firstMonth} ${firstDay} - ${lastMonth} ${lastDay} ${firstYear}`; // if the date range is not in the same month display days range, month and year eg.(Mar 30 - Apr 6 2022.)
    } else {
      str = `${firstMonth} ${firstDay} ${firstYear} - ${lastMonth} ${lastDay} ${lastYear}`; // if the date range is not in the same month display days range, month and year eg.(dec 27 2022. - jan 3 2023)
    }
  }
  return str;
};

//convert any value in set range to a value in different range
export const convertRange = (
  oldValue: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => {
  return ((oldValue - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
};

export const rgbString = (r: number, g: number, b: number) => {
  return "rgb(" + r + "," + g + "," + b + ")";
};
