import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { CircularPagination } from "@/components/Pagination";
import { Select, Option } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function Tables() {
  return (
    <div className="mt-12 mb-8 flex flex-col min-h-[650px] justify-between">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Data Sensors With Real Time
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["id", "temperature", "humidity", "light", "time"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-10 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] text-center font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ id, temperature, humidity, light, time }, key) => {
                  const className = `py-3 px-10 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id} className="text-center">
                      <td className={className}>
                        <div className="text-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-bold text-black">
                          {temperature}
                        </Typography>
                      </td>
                      <td className="text-xs font-bold text-black">
                        {humidity}
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-bold text-black">
                          {light}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {time}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <div className="mt-4">
        <div className="flex flex-row justify-center gap-44">
          <div className="w-10">
            <Select label="Type">
              <Option value="temperature">Temperature</Option>
              <Option value="humidity">Humidity</Option>
              <Option value="light">Light</Option>
            </Select>
          </div>
          <div className="w-10 mx-1">
            <Select label="Condition">
              <Option>Trên 40°C</Option>
              <Option>Từ 20°C đến 40°C</Option>
              <Option>Dưới 20°C</Option>
            </Select>
          </div>
          <Button className="h-10 w-28 flex items-center flex-row">
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
            Reset
          </Button>
        </div>
        <div className="flex justify-center mt-3">
          <CircularPagination />
        </div>
      </div>
    </div>
  );
}

export default Tables;
