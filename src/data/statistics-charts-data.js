import { chartsConfig } from "@/configs";

const dailySalesChart = {
  type: "line",
  height: 390,
  series: [
    {
      name: "Light",
      data: [70, 40, 68, 79, 60, 26, 59, 60, 80, 60, 70, 75, 69, 80, 60, 70, 75, 69, 80, 60, 70, 75, 69, 80, 60],
    },
    {
      name: "Temperature",
      data: [20, 23, 25, 21, 30, 32, 37, 35, 40, 34, 30, 33, 30, 35, 40, 34, 30, 33, 30, 35, 40, 34, 30, 33, 30],
      color: "#ff0000",
    },
    {
      name: "Humidity",
      data: [30, 40, 35, 28, 23, 12, 14, 15, 15, 13, 28, 23, 12, 14, 15, 12, 14, 15, 15, 13,28, 23, 12, 14, 15],
      color: "#ff8b00",
    }
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
      ],
    },
  },
};



export const statisticsChartsData = [
  {
    color: "white",
    title: "Sensor Histogram",
    description: "#Track for the best moment",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  }
];

export default statisticsChartsData;
