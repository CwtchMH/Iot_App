import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { BarsArrowDownIcon, BarsArrowUpIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Pagination } from "@/components/Pagination";
import { useSensorData } from "@/data/sensorData";
import { useSearch } from '@/context/SearchContext';

export function Tables() {
  const { searchTerm, searchType } = useSearch();
  const { sensorData, error } = useSensorData(searchTerm, searchType);

  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
      setSortedData([...sensorData]);
  }, [sensorData]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, sortedData]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedPageData = [...currentTableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    // Create a new array with all elements from sortedData
    const newSortedData = [...sortedData];
    
    // Calculate the starting index of the current page
    const firstPageIndex = (currentPage - 1) * pageSize;
    
    // Use splice to replace elements in newSortedData:
    // 1. Start at firstPageIndex
    // 2. Remove pageSize number of elements
    // 3. Insert all elements from sortedPageData
    newSortedData.splice(firstPageIndex, pageSize, ...sortedPageData);
    
    // Update the state with the new sorted data
    setSortedData(newSortedData);
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'ascending' ? <BarsArrowUpIcon className="h-4 w-4" /> : <BarsArrowDownIcon className="h-4 w-4" />;
    }
    return <ChevronUpDownIcon className="h-4 w-4" />;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!sensorData) {
    return <div>Loading...</div>;
  }

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
                {["id", "temperature", "humidity", "light", "time"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-10 text-left cursor-pointer"
                    onClick={() => requestSort(el)}
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] text-center font-bold uppercase text-blue-gray-400 flex items-center justify-center"
                    >
                      {el} {getSortIcon(el)}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTableData.map(
                ({ _id, id, temperature, humidity, light, createdAt }, key) => {
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
                          {createdAt}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
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
            onPageChange={page => setCurrentPage(page)}
            onPageSizeChange={size => setPageSize(size)}
          />
        </div>
      </div>
    </div>
  );
}

export default Tables;
