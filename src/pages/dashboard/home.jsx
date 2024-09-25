import React, { useCallback } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard, DeviceCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  createStatisticsCardsData,
  createStatisticsChartsData,
  createDeviceCardsData,
} from "@/data";
import { useSensorData } from "@/data/sensorData";
import { useActiveHistoryData } from "@/data/active-history-data";
import { mqttPublish } from "@/MQTT";

export function Home() {
  const { sensorData, error: sensorError } = useSensorData();
  const { activeHistoryData, error: activeHistoryError, setActiveHistoryData } = useActiveHistoryData();

  // Create statistics cards data based on sensor data
  const statisticsCardsData = React.useMemo(
    () => createStatisticsCardsData(sensorData),
    [sensorData],
  );

  // Create statistics charts data based on sensor data
  const statisticsChartsData = React.useMemo(
    () => createStatisticsChartsData(sensorData),
    [sensorData],
  );

  // Create device cards data based on activeHistoryData
  const deviceCardsData = React.useMemo(
    () => createDeviceCardsData(activeHistoryData),
    [activeHistoryData],
  );

  const handleDeviceClick = async (device) => {
    const newStatus = device.footer.status === "on" ? "off" : "on";
    mqttPublish(JSON.stringify({ device: device.title, deviceId: device.idDevice, status: newStatus }));
    try {
      const response = await fetch(`http://localhost:3000/devices/devices-addition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ device: device.title, deviceId: device.idDevice, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Device status updated successfully:', data);
    } catch (error) {
      console.error('Error updating device status:', error);
    }
  };

  if (sensorError || activeHistoryError) {
    return <div>Error: {sensorError || activeHistoryError}</div>;
  }

  return (
    <div className="mt-3">
      <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-8 h-8 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="grid gap-5 grid-cols-7">
        {/* Statistics Charts */}
        <div className="mb-6 shadow-sm col-span-6 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map(({ title, footer, ...rest }) => (
            <StatisticsChart
              key={title}
              {...rest}
              title={title}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  {footer}
                </Typography>
              }
            />
          ))}
        </div>
        {/* Device Cards */}
        <div className="col-span-1 grid gap-4 cursor-pointer">
          {deviceCardsData.map((device) => (
            <DeviceCard
              key={device.title}
              {...device}
              icon={React.createElement(device.icon, {
                style: {
                  color: device.iconColor,
                  animation: device.animation,
                },
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={device.footer.color}>{device.footer.label}</strong>
                  &nbsp;{device.footer.status.toUpperCase()}
                </Typography>
              }
              onClick={() => handleDeviceClick(device)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
