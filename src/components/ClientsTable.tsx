import { useAsyncList } from "@react-stately/data";
import { Cell, Row, TableBody, TableHeader } from "@react-stately/table";
import dayjs from "dayjs";
import React, { useRef } from "react";
import Table from "./Table";
import Column from "./Table/Column";
import { Selection } from "@react-types/shared";

interface Item {
  extid: string;
  passnumber: string;
  inn: string;
  fullname: string;
  login: string;
  mobilephone: string;
  dateofbirth: string;
}

interface Props {
  items: Item[];
  onSelectionChange: (keys: Selection) => void;
}

const ClientsTable: React.FC<Props> = (props) => {
  const tableRef = useRef(null);

  return (
    <Table
      aria-label="Table with static contents"
      selectionMode="single"
      width={1000}
      height={400}
      // sortDescriptor={list.sortDescriptor}
      // onSortChange={list.sort}
      ref={tableRef}
      onSelectionChange={props.onSelectionChange}
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
      <TableBody items={props.items}>
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
