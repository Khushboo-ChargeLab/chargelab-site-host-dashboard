import { memo } from 'react';
import chevnext from '../../../assets/icons/chev-next.svg';
import chevpre from '../../../assets/icons/chev-pre.svg';

interface InputProps {
    totalPage?: number;
    currentPage: number;
    loadPage?: (page:number)=> void;
}
export const GridPager = (
  { totalPage, currentPage, loadPage }:InputProps,
) => {
  const itemsPerPage = 10;
  let start = (Math.floor(currentPage / itemsPerPage) * itemsPerPage) - 1;
  const end = (Math.floor(currentPage / itemsPerPage) + 1) * itemsPerPage;

  if (start + 1 === (totalPage || 1)) {
    start -= itemsPerPage;
  }

  return (
    <div className="flex justify-center items-center w-full">

      <div
        className={`flex pager-span items-center justify-center w-8 text-sm font-normal ${start + 1 > 0 ? ' cursor-pointer' : ' opacity-30'}`}
        onClick={() => (start + 1 > 0) && loadPage && loadPage((Math.floor(currentPage / itemsPerPage) * itemsPerPage) - 1)}
      >
        <img src={chevpre} alt="" />
      </div>

      {[...Array(totalPage)].map((value, index) => (
        index >= start && index < end && (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={() => loadPage && loadPage(index + 1)}
          className={`flex pager-span w-8 items-center justify-center text-sm font-normal cursor-pointer ${index + 1 === currentPage ? 'current-page' : 'text-grey5'}`}
        >
          {index + 1}
        </div>
        )
      ))}

      <div
        className={`flex pager-span items-center justify-center w-8 text-sm font-normal ${end < (totalPage || 1) ? ' cursor-pointer' : ' opacity-30'}`}
        onClick={() => (end < (totalPage || 1)) && loadPage && loadPage((Math.floor(currentPage / itemsPerPage) + 1) * itemsPerPage)}
      >
        <img src={chevnext} alt="" />
      </div>
    </div>
  );
};

GridPager.defaultProps = {
  totalPage: 0,
  loadPage: (page:number) => null,
};

export default memo<InputProps>(GridPager);
