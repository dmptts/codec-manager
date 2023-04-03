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
          <Item>
            <Button
              value={currentPage - 1}
              onClick={handleClick}
              disabled={currentPage === 1}
            >
              Предыдущая
            </Button>
          </Item>
          {getButtonsArr().map((pageIndex, i) => {
            if (pageIndex === REDUCTION_PLACEHOLDER) {
              return (
                <Item key={i}>
                  <Button disabled>...</Button>
                </Item>
              );
            }

            return (
              <Item key={i}>
                <Button
                  value={pageIndex}
                  onClick={handleClick}
                  $isActive={pageIndex === currentPage}
                >
                  {pageIndex}
                </Button>
              </Item>
            );
          })}
          <Item>
            <Button
              value={currentPage + 1}
              onClick={handleClick}
              disabled={currentPage === totalPages}
            >
              Следующая
            </Button>
          </Item>
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

const Item = styled.li`
  &:first-child {
    border-radius: 5px 0 0 5px;
  }

  &:last-child {
    border-radius: 0 5px 5px 0;
  }
`;

const Button = styled.button<{ $isActive?: boolean }>`
  min-width: 49px;
  padding: 14px 20px;

  font-weight: 700;

  background-color: #ffffff;
  border: none;
  cursor: pointer;

  &:disabled {
    color: #bdbdbd;

    background-color: #f3f3f3;
    cursor: default;
  }

  &:hover:not(:disabled) {
    color: #ffffff;

    background-color: ${({ $isActive }) =>
      $isActive ? 'var(--color-brand-orange)' : 'var(--color-brand-violet)'};
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    color: #ffffff;
    background-color: var(--color-brand-orange);
  `}
`;
