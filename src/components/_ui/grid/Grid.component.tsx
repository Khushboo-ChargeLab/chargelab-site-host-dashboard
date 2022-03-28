import React, { useState, useCallback } from 'react';
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
    loadPage?: (page: number, filter?: any)=> void;
}

export const Grid = (
    {
 columns, data, primaryKey, totalPage, loadPage,
}:InputProps,
) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const loadMoreData = useCallback((page: number) => {
        if (page >= 0 && page <= (totalPage || 1)) {
            setCurrentPage(page);

            if (loadPage) {
                loadPage(page);
            }
        }
    }, [loadPage, totalPage]);

    return (
      <>
        <div className="table">
          <GridHeader columns={columns} />

          <GridBody
            columns={columns}
            data={data}
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