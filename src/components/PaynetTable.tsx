import { Tag } from "@chakra-ui/core";
import dayjs from "dayjs";
import { PaynetTransaction } from "MyTypes";
import React, { useRef } from "react";
import Table, { Cell, Column, Row, TableBody, TableHeader } from "./Table";

interface Props {
  items: PaynetTransaction[];
}

const PaynetTable: React.FC<Props> = (props) => {
  const tableRef = useRef(null);

  return (
    <Table
      aria-label="Table with static contents"
      selectionMode="none"
      width={1000}
      height={400}
      // sortDescriptor={list.sortDescriptor}
      // onSortChange={list.sort}
      ref={tableRef}
    >
      <TableHeader>
        <Column key="purpose" allowsSorting={false}>
          Purpose
        </Column>
        <Column align="end" key="withdraw" width={120} allowsSorting={false}>
          Widthdraw
        </Column>
        <Column
          align="end"
          key="reward"
          width={120}
          isRowHeader
          allowsSorting={false}
        >
          Reward
        </Column>
        <Column key="createdon" width={150} allowsSorting={false}>
          Date
        </Column>
        <Column key="state" width={150} allowsSorting={false}>
          State
        </Column>
      </TableHeader>
      <TableBody items={props.items}>
        {(item) => (
          <Row key={item.id}>
            {(key) => (
              <Cell>
                {key === "createdon" ? (
                  dayjs(item[key]).format("YYYY-MM-DD").toString()
                ) : key === "state" ? (
                  <Tag
                    colorScheme={item[key] === "CONFIRMED" ? "green" : "yellow"}
                  >
                    {item[key]}
                  </Tag>
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

export default PaynetTable;
