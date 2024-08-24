import React from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard, DeviceCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  deviceCardData,
} from "@/data";
import { ClockIcon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController } from "@/context";

export function Home() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { statusAC, statusFan, statusLight } = controller;
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
        <div className="mb-6 shadow-sm col-span-6 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon
                    strokeWidth={2}
                    className="h-4 w-4 text-blue-gray-400"
                  />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}
        </div>
        <div className="col-span-1 grid gap-4 cursor-pointer">
          {deviceCardData.map(({ icon, iconColor, title, footer, ...rest }) => {
            switch (title) {
              case "Light":
                if (statusLight === true) {
                  footer.status = "On";
                  footer.color = "text-green-500";
                  iconColor = "yellow";
                } else {
                  footer.status = "Off";
                  footer.color = "text-red-500";
                  iconColor = "white";
                }
                break;
              case "AC":
                if (statusAC === true) {
                  footer.status = "On";
                  footer.color = "text-green-500";
                  iconColor = "blue";
                } else {
                  footer.status = "Off";
                  footer.color = "text-red-500";
                  iconColor = "white";
                }
                break;
              case "Fan":
                if (statusFan === true) {
                  footer.status = "On";
                  footer.color = "text-green-500";
                  iconColor = "green";
                  rest.animation = "spin 4s linear infinite";
                } else {
                  footer.status = "Off";
                  footer.color = "text-red-500";
                  iconColor = "white";
                  rest.animation = "none";
                }
                break;
              default:
                break;
            }
            return (
            <DeviceCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                style: {
                  color: iconColor,
                  animation: rest.animation,
                },
                })
              }
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Status&nbsp;
                  <strong className={footer.color}>{footer.status}</strong>
                </Typography>
              }
            />
          )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
