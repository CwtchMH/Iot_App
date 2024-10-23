import AcUnitIcon from "@mui/icons-material/AcUnit";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import WindPowerIcon from "@mui/icons-material/WindPower";

export function createDeviceCardsData(activeHistoryData, sensorData) {
  
  // Helper function to find the device by type
  const findDevice = (type) => activeHistoryData.find(device => device.device === type);

  // Get devices
  const lightDevice = findDevice("Light");
  const acDevice = findDevice("AC");
  const fanDevice = findDevice("Fan");
  const latestReading = sensorData[0] || {};

  // Kiểm tra trạng thái nhấp nháy
  const isRandomValueHigh = latestReading.random > 60;

  // Đếm số lần random > 60 trong sensorData
  const countRandomHigh = sensorData.filter(data => data.random > 60).length;

  // Biến trạng thái nhấp nháy
  const blinkColor = isRandomValueHigh && (Math.floor(Date.now() / 300) % 2 === 0) ? "red" : "gray"; // Nhấp nháy mỗi 300ms

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
      color: blinkColor, // Đổi màu theo giá trị random và trạng thái nhấp nháy
      icon: TipsAndUpdatesIcon,
      iconColor: "white",
      title: `High Count: ${countRandomHigh}`, // Hiển thị số lần random > 60
      idDevice: "random",
      animation: "none", // Không dùng animation CSS
      footer: {
        color: isRandomValueHigh ? "text-red-500" : "text-gray-500", // Thay đổi màu footer
        status: isRandomValueHigh ? "Warning" : "Normal",
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
