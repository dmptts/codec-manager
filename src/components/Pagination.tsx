import styled from 'styled-components';
import { createRange } from '../utils';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPageIndex: number) => void;
  neighboursCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  neighboursCount = 1,
}: IPaginationProps) {
  const REDUCTION_PLACEHOLDER = 'reduction';

  const totalNumberButtons = neighboursCount * 2 + 3; // 3 -- Первая, текущая и последняя страницы;
  const startPage = Math.max(2, currentPage - neighboursCount);
  const endPage = Math.min(totalPages - 1, currentPage + neighboursCount);

  const getButtonsArr = () => {
    const pages = createRange(startPage, endPage);

    if (totalPages > totalNumberButtons) {
      const hasLeftReduction = startPage > 2;
      const hasRightReduction = totalPages - endPage > 1;

      switch (true) {
        case hasLeftReduction && hasRightReduction:
          return [
            1,
            REDUCTION_PLACEHOLDER,
            ...pages,
            REDUCTION_PLACEHOLDER,
            totalPages,
          ];
        case hasLeftReduction && !hasRightReduction:
          return [1, REDUCTION_PLACEHOLDER, ...pages, totalPages];
        case !hasLeftReduction && hasRightReduction:
          return [1, ...pages, REDUCTION_PLACEHOLDER, totalPages];
        default:
          return [1, ...pages, totalPages];
      }
    } else {
      return createRange(1, totalPages);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(+e.currentTarget.value);
  };

  return (
    <>
      {totalPages > 1 && (
        <Root>
          <li>
            <button
              value={currentPage - 1}
              onClick={handleClick}
              disabled={currentPage === 1}
            >
              Предыдущая
            </button>
          </li>
          {getButtonsArr().map((pageIndex, i) => {
            if (pageIndex === REDUCTION_PLACEHOLDER) {
              return (
                <li key={i}>
                  <button disabled>...</button>
                </li>
              );
            }

            return (
              <li key={i}>
                <button value={pageIndex} onClick={handleClick}>
                  {pageIndex}
                </button>
              </li>
            );
          })}
          <li>
            <button
              value={currentPage + 1}
              onClick={handleClick}
              disabled={currentPage === totalPages}
            >
              Следующая
            </button>
          </li>
        </Root>
      )}
    </>
  );
}

const Root = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;

  list-style: none;
`;
