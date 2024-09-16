import React from "react";
import { Button, IconButton, Select, Option } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { usePagination, DOTS } from './usePagination';

export function Pagination({ currentPage, totalCount, pageSize, onPageChange, onPageSizeChange }) {
  const siblingCount = 1;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <span key={index}>&#8230;</span>;
          }
          return (
            <IconButton
              key={index}
              variant={currentPage === pageNumber ? "filled" : "text"}
              color="gray"
              onClick={() => onPageChange(pageNumber)}
              className="rounded-full"
            >
              {pageNumber}
            </IconButton>
          );
        })}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="w-32">
        <Select size="sm" label="Page size" value={pageSize.toString()} onChange={(value) => onPageSizeChange(Number(value))}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
        </Select>
      </div>
    </div>
  );
}
