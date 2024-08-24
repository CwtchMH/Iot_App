import AcUnitIcon from "@mui/icons-material/AcUnit";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import WindPowerIcon from "@mui/icons-material/WindPower";

export const deviceCardData = [
  {
    color: "gray",
    icon: TipsAndUpdatesIcon,
    iconColor: "white",
    title: "Light",
    value: "70%",
    animation: "none",
    footer: {
      color: "text-green-500",
      status: "Off",
      label: "Status:",
    },
  },
  {
    color: "gray",
    icon: AcUnitIcon,
    iconColor: "white",
    title: "AC",
    value: "70%",
    animation: "none",
    footer: {
      color: "text-green-500",
      status: "Off",
      label: "Status:",
    },
  },
  {
    color: "gray",
    icon: WindPowerIcon,
    iconColor: "green",
    title: "Fan",
    value: "70%",
    animation: "spin 4s linear infinite",
    footer: {
      color: "text-green-500",
      status: "Off",
      label: "Status:",
    },
  },
];

export default deviceCardData;
