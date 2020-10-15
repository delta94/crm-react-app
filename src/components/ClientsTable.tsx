import { useAsyncList } from "@react-stately/data";
import { Cell, Row, TableBody, TableHeader } from "@react-stately/table";
import dayjs from "dayjs";
import React, { useRef } from "react";
import Table from "./Table";
import Column from "./Table/Column";
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

  return (
    <Table
      aria-label="Table with static contents"
      selectionMode="single"
      width={1000}
      height={500}
      // sortDescriptor={list.sortDescriptor}
      // onSortChange={list.sort}
      ref={tableRef}
      onSelectionChange={props.onSelectionChange}
    >
      <TableHeader>
        <Column key="fullname" allowsSorting={false}>
          {formatMessage("components.clientsTable.name")}
        </Column>
        <Column key="login" width={120} allowsSorting={false}>
          {formatMessage("components.clientsTable.login")}
        </Column>
        <Column key="dateofbirth" width={140} isRowHeader allowsSorting={false}>
          {formatMessage("components.clientsTable.dateofbirth")}
        </Column>
        <Column key="mobilephone" width={140} allowsSorting={false}>
          {formatMessage("components.clientsTable.phonenumber")}
        </Column>
        <Column key="inn" width={120} allowsSorting={false}>
          {formatMessage("components.clientsTable.inn")}
        </Column>
        <Column key="passnumber" width={150} allowsSorting={false}>
          {formatMessage("components.clientsTable.passnumber")}
        </Column>
      </TableHeader>
      <TableBody items={props.items}>
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
