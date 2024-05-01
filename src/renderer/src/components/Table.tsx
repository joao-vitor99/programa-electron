/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@prisma/client'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { cn } from '../utils'
import React from 'react'

export interface Table2HeaderType<T extends Record<string, any>> {
  title: string
  keyName: keyof T
  render?: (rowData: T) => React.ReactNode
}

export interface Table2Props<T extends Record<string, any>> {
  header: Table2HeaderType<T>[]
  data: T[]
  onRowClick?: (data?: T) => void
  selectedRow?: T
}

export const CustomTable = <T extends Record<string, any>>({
  data
}: {
  data: Table2Props<T>
}): React.ReactNode => {
  const { data: tableData, header: tableHeaders, onRowClick, selectedRow } = data

  const columnHelper = createColumnHelper<Client>()

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      cell: (info) => info.getValue(),
      header: () => <>Id</>,
      maxSize: 80,
      minSize: 80
    }),
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: () => <>Nome</>,
      maxSize: 256,
      minSize: 256
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      cell: (info) => info.getValue(),
      header: () => <>Telefone</>,
      maxSize: 256,
      minSize: 256
    })
  ]

  const table = useReactTable({
    data: tableData as any,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="w-full">
      <table
        className="border-separate border-spacing-0 border border-lightGray2"
        {...{
          style: {
            width: table.getCenterTotalSize()
          }
        }}
      >
        <thead className="bg-lightGray4">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-t-0 border border-b-0 border-lightGray2 px-4 py-2 font-normal text-left text-[16px] last:border-r-0 first:border-l-0"
                  {...{
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize()
                    }
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={cn(
                'hover:outline',
                'hover:outline-2',
                'hover:outline-gray3',
                'font-normal',
                'last:border-r-0',
                'first:border-l-0',
                {
                  ['outline-blue3 outline-2 outline hover:outline-2 hover:outline-blue1 hover:outline z-10']:
                    Object.values(selectedRow ?? {})?.length
                }
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-lightGray2 px-4 py-0 bg-white text-left"
                  {...{
                    onClick: () => onRowClick?.(row.original as T),
                    style: {
                      width: cell.column.getSize()
                    }
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}
