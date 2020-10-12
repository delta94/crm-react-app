import { useAsyncList } from "@react-stately/data";
import { Cell, Row, TableBody, TableHeader } from "@react-stately/table";
import dayjs from "dayjs";
import React, { useRef } from "react";
import Table from "./Table";
import Column from "./Table/Column";

const ClientsTable = () => {
  const tableRef = useRef(null);
  interface Item {
    extid: string;
    passnumber: string;
    inn: string;
    fullname: string;
    login: string;
    mobilephone: string;
    dateofbirth: string;
  }

  let list = useAsyncList<Item>({
    getKey: (item) => item.extid,
    async load({ signal }) {
      let url = new URL(
        "https://5f7ebbb0094b670016b76686.mockapi.io/api/clients"
      );
      // if (cursor) {
      //   url.searchParams.append("after", cursor);
      // }

      let res = await fetch(url.toString(), { signal });
      let json = await res.json();

      return { items: json.clients };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.slice().sort((a, b) => {
          let cmp =
            a[sortDescriptor.column] < b[sortDescriptor.column] ? -1 : 1;
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Table with static contents"
      selectionMode="single"
      width={1000}
      height={400}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      ref={tableRef}
    >
      <TableHeader>
        <Column key="fullname" allowsSorting={true}>
          Name
        </Column>
        <Column key="login" width={140} allowsSorting={true}>
          Login
        </Column>
        <Column key="dateofbirth" width={140} isRowHeader allowsSorting={true}>
          Date of birth
        </Column>
        <Column key="mobilephone" width={140} allowsSorting={true}>
          Phone number
        </Column>
        <Column key="inn" width={150} allowsSorting={true}>
          INN
        </Column>
        <Column key="passnumber" width={150} allowsSorting={true}>
          Passport number
        </Column>
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={list.isLoading}
        onLoadMore={list.loadMore}
      >
        {(item) => (
          <Row key={item.extid}>
            {(key) => (
              <Cell>
                {key === "dateofbirth"
                  ? dayjs(item[key]).format("YYYY-MM-DD").toString()
                  : item[key]}
              </Cell>
            )}
          </Row>
        )}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
