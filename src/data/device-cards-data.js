import AcUnitIcon from "@mui/icons-material/AcUnit";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import WindPowerIcon from "@mui/icons-material/WindPower";

export function createDeviceCardsData(activeHistoryData) {
  // Helper function to find the device by type
  const findDevice = (type) => activeHistoryData.find(device => device.device === type);

  // Get devices
  const lightDevice = findDevice("Light");
  const acDevice = findDevice("AC");
  const fanDevice = findDevice("Fan");

  return [
    {
      color: "gray",
      icon: TipsAndUpdatesIcon,
      iconColor: lightDevice && lightDevice.status === "on" ? "yellow" : "white",
      title: "Light",
      idDevice: "Ln1",
      animation: "none",
      footer: {
        color: lightDevice && lightDevice.status === "on" ? "text-green-500" : "text-red-500",
        status: (lightDevice && lightDevice.status === "on" ? "on" : "off") || "off",
        label: "Status:",
      },
    },
    {
      color: "gray",
      icon: AcUnitIcon,
      iconColor: acDevice && acDevice.status === "on" ? "blue" : "white",
      title: "AC",
      idDevice: "ACn1",
      animation: "none",
      footer: {
        color: acDevice && acDevice.status === "on" ? "text-green-500" : "text-red-500",
        status: (acDevice && acDevice.status === "on" ? "on" : "off") || "off",
        label: "Status:",
      },
    },
    {
      color: "gray",
      icon: WindPowerIcon,
      iconColor: fanDevice && fanDevice.status === "on" ? "green" : "white",
      title: "Fan",
      idDevice: "Fn1",
      animation: fanDevice && fanDevice.status === "on" ? "spin 4s linear infinite" : "none",
      footer: {
        color: fanDevice && fanDevice.status === "on" ? "text-green-500" : "text-red-500",
        status: (fanDevice && fanDevice.status === "on" ? "on" : "off") || "off",
        label: "Status:",
      },
    },
  ];
}
