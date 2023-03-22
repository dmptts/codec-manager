import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fetchCodecList } from '../api/codecs';
import { APP_ROUTES } from '../const';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { codecsSelectors } from '../store/codecsSlice';
import { ICodec } from '../types/codec';

export default function CodecListPage() {
  const dispatch = useAppDispatch();
  const codecs = useAppSelector(codecsSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchCodecList());
  }, [dispatch]);

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
    data: codecs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        id: false,
      },
    },
  });

  return (
    <>
      <h1>Страница списка кодеков</h1>
      <Link to={APP_ROUTES.EditCodec}>Редактирование</Link>
      <Link to={APP_ROUTES.CreateCodec}>Создание</Link>
      <table>
        <thead>
          {codecsTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th>Контролы</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {codecsTable.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <Link to={`/edit/${row.getValue('id')}`}>Редактировать</Link>
                <button>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
