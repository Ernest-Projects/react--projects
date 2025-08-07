import type { BaseData } from "./types";

export const base: BaseData = {
  weight: {
    abbreviation: {
      one: "kg",
      two: "lbs",
      three: "oz",
    },
    button_name: {
      one: "kilograms",
      two: "pounds",
      three: "ounces",
    },
    convertation: {
      one: { three: 35.273, two: 2.204 },
      two: { three: 16, one: 0.453 },
      three: { one: 0.028, two: 0.062 },
    },
    notate: {
      three_one: "1 ounce = 0.028 kilograms",
      three_two: "1 ounce = 0.062 pounds",
      one_two: "1 kilogram = 2.204 pounds",
      one_three: "1 kilogram = 35.273 ounces",
      two_one: "1 pound = 0.453 kilograms",
      two_three: "1 pound = 16 ounces",
    },
  },

  currency: {
    abbreviation: {
      one: "uan",
      two: "usd",
      three: "eur",
    },
    button_name: {
      one: "hryvnias",
      two: "US dollars",
      three: "euros",
    },
    convertation: {
      one: { two: 0.024, three: 0.021 },
      two: { one: 41.71, three: 0.87 },
      three: { one: 48.13, two: 1.15 },
    },
    notate: {
      one_two: "1 hryvnia = 0.024 dollars",
      two_one: "1 dollar = 41.71 hryvnias",
      two_three: "1 dollar = 0.87 euros",
      three_two: "1 euro = 1.15 dollars",
      three_one: "1 euro = 48.13 hryvnias",
      one_three: "1 hryvnia = 0.021 euros",
    },
  },

  length: {
    abbreviation: {
      one: "km",
      two: "ml",
      three: "yd",
    },
    button_name: {
      one: "kilometers",
      two: "miles",
      three: "yards",
    },
    convertation: {
      one: { two: 0.621, three: 1093.6133 },
      two: { one: 1.609, three: 1760 },
      three: { one: 0.000914, two: 0.000568181818 },
    },
    notate: {
      one_two: "1 kilometer = 0.621 miles",
      two_one: "1 mile = 1.609 kilometers",
      two_three: "1 mile = 1760 yards",
      three_two: "1 yard = 0.0005 miles",
      three_one: "1 yard = 0.0009 kilometers",
      one_three: "1 kilometer = 1093.613 yards",
    },
  },
};
