import React, { memo } from 'react';
import { chevnext, chevpre } from '../../../lib';

interface InputProps {
  totalPage?: number;
  currentPage: number;
  loadPage?: (page: number) => void;
}
export const GridPager = memo(
  ({ totalPage, currentPage, loadPage }: InputProps) => {
    const itemsPerPage = 10;
    let start = Math.floor(currentPage / itemsPerPage) * itemsPerPage - 1;
    const end = (Math.floor(currentPage / itemsPerPage) + 1) * itemsPerPage;

    if (start + 1 === (totalPage || 1)) {
      start -= itemsPerPage;
    }

    return (
      <div className='flex justify-center items-center w-full'>
        <div
          className={`flex pager-span items-center justify-center w-8 text-sm font-normal ${
            start + 1 > 0 ? ' cursor-pointer' : ' opacity-30'
          }`}
          onClick={() =>
            start + 1 > 0 &&
            loadPage &&
            loadPage(Math.floor(currentPage / itemsPerPage) * itemsPerPage - 1)
          }
        >
          <img src={chevpre} alt='' />
        </div>

        {Array.from(Array(totalPage).keys()).map(
          (value, index) =>
            index >= start &&
            index < end && (
              <div
                key={value}
                onClick={() => loadPage && loadPage(index + 1)}
                className={`flex pager-span w-8 items-center justify-center text-sm font-normal cursor-pointer ${
                  index + 1 === currentPage ? 'current-page' : 'text-grey5'
                }`}
              >
                {index + 1}
              </div>
            ),
        )}

        <div
          className={`flex pager-span items-center justify-center w-8 text-sm font-normal ${
            end < (totalPage || 1) ? ' cursor-pointer' : ' opacity-30'
          }`}
          onClick={() =>
            end < (totalPage || 1) &&
            loadPage &&
            loadPage(
              (Math.floor(currentPage / itemsPerPage) + 1) * itemsPerPage,
            )
          }
        >
          <img src={chevnext} alt='' />
        </div>
      </div>
    );
  },
);
