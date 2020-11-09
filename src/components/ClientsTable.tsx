import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import Table, { Cell, Row, TableBody, Column, TableHeader } from "./Table";
import { Selection } from "@react-types/shared";
import PhoneNumber from "awesome-phonenumber";
import { useMessageFormatter } from "@react-aria/i18n";
import strings from "config/strings";

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
  const formatMessage = useMessageFormatter(strings);
  const [items, setItems] = useState(props.items);

  const [sortDescriptor, setSortDescriptor] = useState(null);

  const onSort = (sortDescriptor: any) => {
    setItems((prevItems) =>
      prevItems.slice().sort((a, b) => {
        let cmp = a[sortDescriptor.column] < b[sortDescriptor.column] ? -1 : 1;
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      })
    );
    setSortDescriptor(sortDescriptor);
  };

  return (
    <Table
      aria-label="Table with static contents"
      selectionMode="single"
      // width={600}
      height={500}
      overflowMode="wrap"
      density="spacious"
      sortDescriptor={sortDescriptor}
      onSortChange={onSort}
      ref={tableRef}
      onSelectionChange={props.onSelectionChange}
    >
      <TableHeader>
        <Column key="fullname" allowsSorting={true}>
          {formatMessage("components.clientsTable.name")}
        </Column>
        <Column key="login" width={140} allowsSorting={true}>
          {formatMessage("components.clientsTable.login")}
        </Column>
        <Column key="dateofbirth" width={140} isRowHeader allowsSorting={true}>
          {formatMessage("components.clientsTable.dateofbirth")}
        </Column>
        <Column key="mobilephone" width={140} allowsSorting={true}>
          {formatMessage("components.clientsTable.phonenumber")}
        </Column>
        <Column key="inn" width={120} allowsSorting={true}>
          {formatMessage("components.clientsTable.inn")}
        </Column>
        <Column key="passnumber" width={150} allowsSorting={true}>
          {formatMessage("components.clientsTable.passnumber")}
        </Column>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <Row key={item.extid}>
            {(key) => (
              <Cell>
                {key === "dateofbirth"
                  ? dayjs(item[key]).format("YYYY-MM-DD").toString()
                  : key === "mobilephone"
                  ? new PhoneNumber(item[key], "UZ").getNumber("national")
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
