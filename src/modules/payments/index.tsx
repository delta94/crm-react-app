import { Box, Tag, Text } from "@chakra-ui/core";
import { useAsyncList } from "@react-stately/data";
import { Cell, Row, TableBody, TableHeader } from "@react-stately/table";
import SectionHeading from "components/SectionHeading";
import Table from "components/Table";
import Column from "components/Table/Column";
import dayjs from "dayjs";
import React, { useRef } from "react";

const PaymentsTable = () => {
  const tableRef = useRef(null);
  interface Item {
    providerid: string;
    withdraw: number;
    reward: number;
    purpose: string;
    createdon: string;
    state: string;
  }

  let list = useAsyncList<Item>({
    getKey: (item) => item.providerid,
    async load({ signal }) {
      let url = new URL(
        "https://5f7ebbb0094b670016b76686.mockapi.io/api/payments"
      );
      // if (cursor) {
      //   url.searchParams.append("after", cursor);
      // }

      let res = await fetch(url.toString(), { signal });
      let json = await res.json();

      return { items: json.transacts };
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
      selectionMode="none"
      width={1000}
      height={400}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      ref={tableRef}
    >
      <TableHeader>
        <Column key="purpose" allowsSorting={true}>
          Purpose
        </Column>
        <Column align="end" key="withdraw" width={120} allowsSorting={true}>
          Widthdraw
        </Column>
        <Column
          align="end"
          key="reward"
          width={120}
          isRowHeader
          allowsSorting={true}
        >
          Reward
        </Column>
        <Column key="createdon" width={150} allowsSorting={true}>
          Date
        </Column>
        <Column key="state" width={150} allowsSorting={true}>
          State
        </Column>
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={list.isLoading}
        onLoadMore={list.loadMore}
      >
        {(item) => (
          <Row key={item.providerid}>
            {(key) => (
              <Cell>
                {key === "createdon" ? (
                  dayjs(item[key]).format("YYYY-MM-DD").toString()
                ) : key === "state" ? (
                  <Tag colorScheme="green">{item[key]}</Tag>
                ) : (
                  item[key]
                )}
              </Cell>
            )}
          </Row>
        )}
      </TableBody>
    </Table>
  );
};

const Payments = () => {
  return (
    <Box>
      <SectionHeading mb={10}>Payments</SectionHeading>
      <PaymentsTable />
    </Box>
  );
};

export default Payments;
