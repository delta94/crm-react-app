import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import Sidebar from "components/Sidebar";
import Table from "components/Table";
import React, { useRef } from "react";

import {
  Cell,
  Column as StatelyColumn,
  Row,
  TableBody,
  TableHeader,
} from "@react-stately/table";
import { useAsyncList } from "@react-stately/data";
import { SpectrumColumnProps } from "@react-types/table";

const Column = StatelyColumn as <T>(
  props: SpectrumColumnProps<T>
) => JSX.Element;

const Content = () => {
  const tableRef = useRef(null);
  interface Item {
    data: {
      id: string;
      url: string;
      title: string;
    };
  }

  let list = useAsyncList<Item>({
    getKey: (item) => item.data.id,
    async load({ signal, cursor }) {
      let url = new URL("https://www.reddit.com/r/news.json");
      if (cursor) {
        url.searchParams.append("after", cursor);
      }

      let res = await fetch(url.toString(), { signal });
      let json = await res.json();

      return { items: json.data.children, cursor: json.data.after };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.slice().sort((a, b) => {
          let cmp =
            a.data[sortDescriptor.column] < b.data[sortDescriptor.column]
              ? -1
              : 1;
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  // console.log(list.items);

  return (
    <Flex justify="center" flex={1} bg="gray.100" overflow="auto">
      <Box width="90%" mt="80px">
        <Flex
          borderBottomStyle="solid"
          borderBottomWidth="2px"
          borderBottomColor="gray.200"
          pb={3}
          mb={10}
        >
          <Heading size="lg">Users</Heading>
        </Flex>
        <Box>
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
              <Column key="score" width={100} allowsSorting>
                Score
              </Column>
              <Column key="title" isRowHeader allowsSorting>
                Title
              </Column>
              <Column key="author" width={200} allowsSorting>
                Author
              </Column>
              <Column key="num_comments" width={120} allowsSorting>
                Comments
              </Column>
            </TableHeader>
            <TableBody
              items={list.items}
              isLoading={list.isLoading}
              onLoadMore={list.loadMore}
            >
              {(item) => (
                <Row key={item.data.id}>
                  {(key) =>
                    key === "title" ? (
                      <Cell textValue={item.data.title}>
                        <Link href={item.data.url} isExternal>
                          {item.data.title}
                        </Link>
                      </Cell>
                    ) : (
                      <Cell>{item.data[key]}</Cell>
                    )
                  }
                </Row>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Flex>
  );
};

const Dashboard = () => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Content />
    </Flex>
  );
};

export default Dashboard;
