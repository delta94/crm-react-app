import { useAsyncList } from "@react-stately/data";
import {
  Cell,
  Column as StatelyColumn,
  Row,
  TableBody,
  TableHeader,
} from "@react-stately/table";
import { SpectrumColumnProps } from "@react-types/table";
import dayjs from "dayjs";
import React, { useRef } from "react";
import Table from "./Table";

const Column = StatelyColumn as <T>(
  props: SpectrumColumnProps<T>
) => JSX.Element;

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
    // async sort({ items, sortDescriptor }) {
    //   return {
    //     items: items.slice().sort((a, b) => {
    //       let cmp =
    //         a.data[sortDescriptor.column] < b.data[sortDescriptor.column]
    //           ? -1
    //           : 1;
    //       if (sortDescriptor.direction === "descending") {
    //         cmp *= -1;
    //       }
    //       return cmp;
    //     }),
    //   };
    // },
  });

  return (
    <Table
      aria-label="Table with static contents"
      selectionMode="none"
      width={1000}
      height={400}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      // ref={tableRef}
    >
      <TableHeader>
        <Column key="fullname" allowsSorting={false}>
          Name
        </Column>
        <Column key="login" width={140} allowsSorting={false}>
          Login
        </Column>
        <Column key="dateofbirth" width={140} isRowHeader allowsSorting={false}>
          Date of birth
        </Column>
        <Column key="mobilephone" width={140} allowsSorting={false}>
          Phone number
        </Column>
        <Column key="inn" width={150} allowsSorting={false}>
          INN
        </Column>
        <Column key="passnumber" width={150} allowsSorting={false}>
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
