"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { useState, useMemo  } from "react";
import {rows,columns} from "./data";
import Link from "next/link";


export default function NotificationTable() {
    const [search, setSearch] = useState("");

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((rows) => {
    return Object.values(rows).some(
      (s) =>
        typeof s === "string" && s.toLowerCase().includes(search.toLowerCase())
    );
  });

  

  return (
    <div className="flex flex-col w-full">
      <input
        className="w-60 h-10 border-2 border-primary rounded-3xl bg-gray-100 m-5 px-3 hover:border-4 hover:scale-110 hover:transition hover:duration-700 hover:ease-in-out "
        type="text"
        placeholder="جست و جو ..."
        value={search}
        onChange={searchHandler}
      />
      <Table
        className="p-5 "
        aria-label="Controlled table example with dynamic content"
        selectionMode="multiple"
      >
        <TableHeader className="" columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>
             <Link href={`/admin/notification/allNotification?orderBy=${column.key}`} > {column.label}</Link>
              </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredRows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
