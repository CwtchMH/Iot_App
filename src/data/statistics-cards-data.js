import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  SunIcon
} from "@heroicons/react/24/solid";
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';

export const statisticsCardsData = [
  {
    color: "yellow",
    icon: SunIcon,
    title: "Light",
    value: "70%",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than last week",
    },
  },
  {
    color: "blue",
    icon: OpacityIcon,
    title: "Humidity",
    value: "20%",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "red",
    icon: ThermostatIcon,
    title: "Temperature",
    value: "30°C",
    footer: {
      color: "text-red-500",
      value: "-2°C",
      label: "than yesterday",
    },
  }
];

export default statisticsCardsData;
