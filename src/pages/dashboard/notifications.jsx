import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useActiveHistoryData } from "@/data/active-history-data";
import { Pagination } from "@/components/Pagination";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";
import { useSearch } from '@/context/SearchContext';

export function Notifications() {
  const { searchTerm, searchType } = useSearch();
  const { activeHistoryData, error } = useActiveHistoryData(searchTerm, searchType);

  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setSortedData([...activeHistoryData]);
  }, [activeHistoryData]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, sortedData]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sorted = [...currentTableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    const newSortedData = [...sortedData];
    const firstPageIndex = (currentPage - 1) * pageSize;
    newSortedData.splice(firstPageIndex, pageSize, ...sorted);
    setSortedData(newSortedData);
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "ascending" ? (
        <BarsArrowUpIcon className="h-4 w-4" />
      ) : (
        <BarsArrowDownIcon className="h-4 w-4" />
      );
    }
    return <ChevronUpDownIcon className="h-4 w-4" />;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activeHistoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col min-h-[650px] justify-between">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Active History Data With Real Time
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Device", "DeviceID", "Status", "Time"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left cursor-pointer"
                    onClick={() =>
                      el.toLowerCase() != "status"
                        ? requestSort(el.toLowerCase())
                        : null
                    }
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] text-center font-bold uppercase text-blue-gray-400 flex items-center justify-center"
                    >
                      {el}{" "}
                      {el.toLowerCase() != "status"
                        ? getSortIcon(el.toLowerCase())
                        : null}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTableData.map(
                (
                  { _id, id, device, deviceId, status, createdAt },
                  key,
                ) => {
                  const className = `py-3 px-10 ${
                    key === currentTableData.length - 1
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
                          {device}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-bold text-black">
                          {deviceId}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-bold text-black">
                          {status}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {createdAt}
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
        <div className="flex justify-center mt-3">
          <Pagination
            currentPage={currentPage}
            totalCount={sortedData.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(size) => setPageSize(size)}
          />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
