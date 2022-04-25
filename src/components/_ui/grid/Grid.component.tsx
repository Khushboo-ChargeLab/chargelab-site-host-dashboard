import React, { useState, useCallback, useEffect } from 'react';
import { GridBody } from './Grid-Body.component';
import { GridHeader } from './Grid-Header.component';
import { GridPager } from './Grid-Pager.component';
import './Grid.component.scss';
import { GridColumn } from './types/Grid-Column.interface';

export interface InputProps {
  columns: GridColumn[];
  data?: any[];
  primaryKey: string;
  totalPage?: number;
  loadPage?: (page: number, filter?: any) => void;
  pageIndex?: number;
  onRowClick?: (rowData: any) => void;
  local?: boolean;
}

export const Grid = ({
  columns,
  data,
  primaryKey,
  totalPage,
  loadPage,
  pageIndex = 1,
  local = false,
  onRowClick,
}: InputProps) => {
  const [currentPage, setCurrentPage] = useState<number>(pageIndex);

  const loadMoreData = useCallback(
    (page: number) => {
      if (page >= 0 && page <= (totalPage || 1)) {
        setCurrentPage(page);

        if (loadPage) {
          loadPage(page);
        }
      }
    },
    [loadPage, totalPage],
  );

  useEffect(() => {
    setCurrentPage(pageIndex);
  }, [pageIndex]);
  return (
    <>
      <div className='table w-full'>
        <GridHeader columns={columns} />

        <GridBody
          onRowClick={onRowClick}
          columns={columns}
          data={data}
          local={local}
          pageIndex={pageIndex}
          primaryKey={primaryKey}
        />
      </div>

      <GridPager
        totalPage={totalPage || 1}
        currentPage={currentPage}
        loadPage={loadMoreData}
      />
    </>
  );
};
