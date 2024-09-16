import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  // This line creates an array of numbers from 'start' to 'end' (inclusive)
  // 1. Array.from() creates a new array from an array-like or iterable object
  // 2. { length } is an object with a 'length' property, used to create an array of that length
  // 3. The second argument is a mapping function: (_, idx) => idx + start
  //    - '_' is a convention for an unused parameter (the array element, which is undefined here)
  //    - 'idx' is the index of the current element
  //    - 'idx + start' calculates the actual number for this position in the range
  // This effectively creates an array of numbers from 'start' to 'end'
  // The value of idx is the index of the current element in the array being created.
  // It starts from 0 and goes up to length - 1.
  return Array.from({ length }, (_, idx) => idx + start);
};

// The usePagination function is a custom hook that calculates the pagination range
// It takes four parameters:
// - totalCount: The total number of items to be paginated
// - pageSize: The number of items per page
// - siblingCount: The number of page numbers to show on each side of the current page (default is 1)
// - currentPage: The current active page
export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
  }) => {
    // The function body continues below...
    // It uses these parameters to calculate and return an array representing the pagination range,
    // which includes page numbers and potentially dots (...) for skipped pages
    const paginationRange = useMemo(() => {
      const totalPageCount = Math.ceil(totalCount / pageSize);
  
      // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
      const totalPageNumbers = siblingCount + 5;
  
      /*
        Case 1:
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount]
      */
      if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
      }
  
      /*
          Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
      */
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );
  
      /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
      */
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  
      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;
  
      /*
          Case 2: No left dots to show, but rights dots to be shown
      */
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);
  
        return [...leftRange, DOTS, totalPageCount];
      }
  
      /*
          Case 3: No right dots to show, but left dots to be shown
      */
      if (shouldShowLeftDots && !shouldShowRightDots) {
  
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(
          totalPageCount - rightItemCount + 1,
          totalPageCount
        );
        return [firstPageIndex, DOTS, ...rightRange];
      }
  
      /*
          Case 4: Both left and right dots to be shown
      */
      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }, [totalCount, pageSize, siblingCount, currentPage]);
  
    return paginationRange;
  };