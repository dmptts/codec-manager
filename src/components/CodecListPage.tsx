import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ICodec } from '../types/codec';
import Pagination from './Pagination';
import Container from './Container';
import { useGetCodecListQuery } from '../store/codecApi';
import { ReactComponent as PenIcon } from './../img/icon-pen.svg';
import { ReactComponent as BucketIcon } from './../img/icon-bucket.svg';

export default function CodecListPage() {
  // TODO: избавиться от константы и реализовать стор для пагинации при переводе на прод
  const TOTAL_PAGES = 10;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page'))
  );
  const { data = [] } = useGetCodecListQuery(currentPage);

  const columnHelper = createColumnHelper<ICodec>();
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: () => <span>Имя</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: () => <span>Описание</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('extends_id', {
      header: () => <span>Расширяет кодек</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: () => <span>Статус</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('created_at', {
      header: () => <span>Создан</span>,
      cell: (info) => new Date(info.getValue()).toLocaleString('ru-RU'),
    }),
    columnHelper.accessor('updated_at', {
      header: () => <span>Обновлен</span>,
      cell: (info) => new Date(info.getValue()).toLocaleString('ru-RU'),
    }),
  ];

  const codecsTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        id: false,
      },
    },
  });

  return (
    <Container>
      <h1>Страница списка кодеков</h1>
      <StyledTable>
        <thead>
          {codecsTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Header key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Header>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody>
          {codecsTable.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
              <Cell>
                <ControlsContainer>
                  <EditButton to={`/edit/${row.getValue('id')}`}>
                    <PenIcon />
                    Редактировать
                  </EditButton>
                  <DeleteButton>
                    <BucketIcon />
                    Удалить
                  </DeleteButton>
                </ControlsContainer>
              </Cell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {currentPage && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={TOTAL_PAGES}
        />
      )}

      <Link to={'/create'}>Создать новый</Link>
    </Container>
  );
}

const StyledTable = styled.table`
  border: 1px solid #ededed;
  border-collapse: collapse;
`;

const Header = styled.th`
  padding: 20px;

  font-family: var(--font-object-sans);
  font-weight: 900;
  color: var(--color-text-secondary);
  text-align: left;

  border: 1px solid #ededed;
`;

const Cell = styled.td`
  padding: 8px 20px;

  font-weight: 500;
  color: var(--color-text-secondary);

  border: 1px solid #ededed;
`;

const ControlsContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;

const EditButton = styled(Link)`
  width: 24px;
  height: 24px;

  font-size: 0;

  svg {
    width: 24px;
    height: 24px;

    stroke: var(--color-text-secondary);
  }

  &:hover svg {
    stroke: var(--color-brand-orange);
  }
`;

const DeleteButton = styled.a`
  display: block;
  width: 24px;
  height: 24px;

  font-size: 0;

  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;

    stroke: var(--color-text-secondary);
  }

  &:hover svg {
    stroke: var(--color-brand-orange);
  }
`;
