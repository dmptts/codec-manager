import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PaginationState } from '@tanstack/react-table';
import Pagination from './Pagination';
import Container from './Container';
import CodecTable from './CodecTable';
import PageJumper from './PageJumper';

export default function CodecListPage() {
  // TODO: избавиться от константы и реализовать стор для пагинации при переводе на прод
  const TOTAL_PAGES = 10;
  const [searchParams] = useSearchParams();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Number(searchParams.get('page')),
    pageSize: TOTAL_PAGES,
  });

  const handlePageChange = (newPageIndex: number) => {
    setPagination({
      pageIndex: newPageIndex,
      pageSize,
    });
  };

  return (
    <Container>
      <h1>Страница списка кодеков</h1>
      <CodecTable
        paginationState={{ pageIndex, pageSize }}
        setPagination={setPagination}
      />
      {pageIndex && (
        <>
          <Pagination
            currentPage={pageIndex}
            onPageChange={handlePageChange}
            totalPages={TOTAL_PAGES}
          />
          <PageJumper
            totalPages={TOTAL_PAGES}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <Link to={'/create'}>Создать новый</Link>
    </Container>
  );
}
