import {
  SunIcon
} from "@heroicons/react/24/solid";
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';

export function createStatisticsCardsData(sensorData) {
  // Assuming sensorData is an array and we want the latest reading
  const latestReading = sensorData[0] || {};
  const hourAgoReading = sensorData[29] || {};

  return [
    {
      color: "yellow",
      colorBg: latestReading.light > 75 ? "yellow-700" : latestReading.light > 50 ? "yellow-400" : latestReading.light > 25 ? "yellow-200" : "yellow-100",
      icon: SunIcon,
      title: "Light",
      value: `${latestReading.light || 0}%`,
      footer: {
        color: hourAgoReading.light > latestReading.light ? "text-red-500" : "text-green-300",
        value: hourAgoReading.light > latestReading.light ? "-" + (((hourAgoReading.light - latestReading.light) / hourAgoReading.light) * 100).toFixed(2) + "%" : "+" + (((latestReading.light - hourAgoReading.light) / hourAgoReading.light) * 100).toFixed(2) + "%",
        label: "than last minute",
      },
    },
    {
      color: "blue",
      colorBg: latestReading.humidity > 75 ? "blue-700" : latestReading.humidity > 50 ? "blue-400" : latestReading.humidity > 25 ? "blue-200" : "blue-100",
      icon: OpacityIcon,
      title: "Humidity",
      value: `${latestReading.humidity || 0}%`,
      footer: {
        color: hourAgoReading.humidity > latestReading.humidity ? "text-red-500" : "text-green-300",
        value: hourAgoReading.humidity > latestReading.humidity ? "-" + (((hourAgoReading.humidity - latestReading.humidity) / hourAgoReading.humidity) * 100).toFixed(2) + "%" : "+" + (((latestReading.humidity - hourAgoReading.humidity) / hourAgoReading.humidity) * 100).toFixed(2) + "%",
        label: "than last minute",
      },
    },
    {
      color: "red",
      colorBg: latestReading.temperature > 75 ? "red-600" : latestReading.temperature > 50 ? "red-300" : latestReading.temperature > 25 ? "red-200" : "red-100",
      icon: ThermostatIcon,
      title: "Temperature",
      value: `${latestReading.temperature || 0}°C`,
      footer: {
        color: hourAgoReading.temperature > latestReading.temperature ? "text-red-500" : "text-green-300",
        value: hourAgoReading.temperature > latestReading.temperature ? "-" + (((hourAgoReading.temperature - latestReading.temperature) / hourAgoReading.temperature) * 100).toFixed(2) + "%" : "+" + (((latestReading.temperature - hourAgoReading.temperature) / hourAgoReading.temperature) * 100).toFixed(2) + "%",
        label: "than last minute",
      },
    },
    {
      color: "orange",
      colorBg: latestReading.random > 75 ? "orange-600" : latestReading.random > 50 ? "orange-300" : latestReading.random > 25 ? "orange-200" : "orange-100",
      icon: ThermostatIcon,
      title: "RandomSensor",
      value: `${latestReading.random || 0}`,
      footer: {
        color: hourAgoReading.random > latestReading.random ? "text-red-500" : "text-green-300",
        value: hourAgoReading.random > latestReading.random ? "-" + (((hourAgoReading.random - latestReading.random) / hourAgoReading.random) * 100).toFixed(2) + "%" : "+" + (((latestReading.random - hourAgoReading.random) / hourAgoReading.random) * 100).toFixed(2) + "%",
        label: "than last minute",
      },
    }
  ];
}
