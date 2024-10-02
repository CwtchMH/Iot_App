import { chartsConfig } from "@/configs";
import { useEffect } from "react";

export function createStatisticsChartsData(sensorData) {
  // Khởi tạo dữ liệu cho mỗi cảm biến
  const lightData = [];
  const temperatureData = [];
  const humidityData = [];
  const timePoints = [];

  // Hàm phân tích chuỗi ngày giờ
  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hours, minutes, seconds] = timePart.split(":");
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  };

  // Xử lý dữ liệu cảm biến
  const newArr = [...sensorData].reverse();
  newArr.forEach((reading) => {
    const date = parseDate(reading.createdAt); // Phân tích ngày giờ
    const timeLabel = reading.createdAt.slice(11); // Chuyển đổi thành chuỗi thời gian

    // Thêm dữ liệu vào mảng
    lightData.push(reading.light);
    temperatureData.push(reading.temperature);
    humidityData.push(reading.humidity);
    timePoints.push(timeLabel);

    // Giới hạn số lượng dữ liệu chỉ giữ lại 12 mục mới nhất
    if (lightData.length > 12) {
      lightData.shift(); // Xóa mục đầu tiên
      temperatureData.shift(); // Xóa mục đầu tiên
      humidityData.shift(); // Xóa mục đầu tiên
      timePoints.shift(); // Xóa mục đầu tiên
    }
  });

  const SensorChart = {
    type: "line",
    height: 390,
    series: [
      {
        name: "Light",
        data: lightData,
      },
      {
        name: "Temperature",
        data: temperatureData,
        color: "#ff0000",
      },
      {
        name: "Humidity",
        data: humidityData,
        color: "#ff8b00",
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1", "#ff0000", "#ff8b00"],
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: timePoints, // Sử dụng thời gian thực tế
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "Value",
        },
      },
      tooltip: {
        x: {
          formatter: (val) => `Time: ${val}`,
        },
      },
    },
  };

  return [
    {
      color: "white",
      title: "Sensor Live Data",
      description: "Live tracking of sensor data every 5 seconds.",
      footer: "updated recently",
      chart: SensorChart,
    },
  ];
}