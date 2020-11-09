import { useTable } from "@react-aria/table";
import { layoutInfoToStyle, VirtualizerItem } from "@react-aria/virtualizer";
import { ReusableView } from "@react-stately/virtualizer";
import { SpectrumTableProps, TableNode } from "@react-types/table";
import React, {
  forwardRef,
  ReactElement,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import CenteredWrapper from "./CenteredWrapper";
import TableCell from "./TableCell";
import TableCheckboxCell from "./TableCheckboxCell";
import TableHeader from "./TableHeader";
import TableHeaderRow from "./TableHeaderRow";
import TableRow from "./TableRow";
import TableRowGroup from "./TableRowGroup";
import TableRowHeader from "./TableRowHeader";
import TableSelectAllCell from "./TableSelectAllCell";
import { TableContext } from "./useTableContext";
import { useTableState } from "@react-stately/table";
import { TableLayout } from "@react-stately/layout";
import { DOMRef, DOMRefValue } from "@react-types/shared";
import TableColumnHeader from "./TableColumnHeader";
import TableVirtualizer from "./TableVirtualizer";
import { Box, Spinner } from "@chakra-ui/core";

import { VariableSizeList as List } from "react-window";

const DEFAULT_HEADER_HEIGHT = {
  medium: 38,
  large: 40,
};

const ROW_HEIGHTS = {
  compact: {
    medium: 32,
    large: 40,
  },
  regular: {
    medium: 46,
    large: 50,
  },
  spacious: {
    medium: 48,
    large: 60,
  },
};

export function createDOMRef<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): DOMRefValue<T> {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    },
  };
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref: DOMRef<T>
): RefObject<T> {
  let domRef = useRef<T>(null);
  useImperativeHandle(ref, () => createDOMRef(domRef));
  return domRef;
}

function Table<T extends object>(
  props: SpectrumTableProps<T>,
  ref: DOMRef<HTMLDivElement>
) {
  // props = useProviderProps(props);

  // let { styleProps } = useStyleProps(props);
  let state = useTableState({ ...props, showSelectionCheckboxes: true });
  let domRef = useDOMRef(ref);
  // let formatMessage = useMessageFormatter(intlMessages);

  // let { scale } = useProvider();
  let density = props.density || "regular";
  let layout = useMemo(
    () =>
      new TableLayout({
        // If props.rowHeight is auto, then use estimated heights based on scale, otherwise use fixed heights.
        rowHeight:
          props.overflowMode === "wrap" ? null : ROW_HEIGHTS[density]["medium"],
        estimatedRowHeight:
          props.overflowMode === "wrap" ? ROW_HEIGHTS[density]["medium"] : null,
        headingHeight:
          props.overflowMode === "wrap"
            ? null
            : DEFAULT_HEADER_HEIGHT["medium"],
        estimatedHeadingHeight:
          props.overflowMode === "wrap"
            ? DEFAULT_HEADER_HEIGHT["medium"]
            : null,
      }),
    [props.overflowMode, density]
  );
  // let { direction } = useLocale();
  layout.collection = state.collection;

  let { gridProps } = useTable(
    {
      ...props,
      ref: domRef,
      isVirtualized: true,
      layout,
    },
    state
  );
  // console.log(state.collection);

  // This overrides collection view's renderWrapper to support DOM heirarchy.
  type View = ReusableView<TableNode<T>, unknown>;
  let renderWrapper = (
    parent: View,
    reusableView: View,
    children: View[],
    renderChildren: (views: View[]) => ReactElement[]
  ) => {
    let style = layoutInfoToStyle(
      reusableView.layoutInfo,
      "ltr",
      parent && parent.layoutInfo
    );
    if (style.overflow === "hidden") {
      style.overflow = "visible"; // needed to support position: sticky
    }

    if (reusableView.viewType === "rowgroup") {
      return (
        <TableRowGroup key={reusableView.key} style={style}>
          {renderChildren(children)}
        </TableRowGroup>
      );
    }

    if (reusableView.viewType === "header") {
      return (
        <TableHeader key={reusableView.key} style={style}>
          {renderChildren(children)}
        </TableHeader>
      );
    }

    if (reusableView.viewType === "row") {
      return (
        <TableRow
          key={reusableView.key}
          item={reusableView.content}
          style={style}
        >
          {renderChildren(children)}
        </TableRow>
      );
    }

    if (reusableView.viewType === "headerrow") {
      // React.cloneElement(children);
      return (
        <TableHeaderRow
          key={reusableView.key}
          style={style}
          item={reusableView.content}
        >
          {renderChildren(children)}
        </TableHeaderRow>
      );
    }

    return (
      <VirtualizerItem
        key={reusableView.key}
        reusableView={reusableView}
        parent={parent}
      />
    );
  };

  let renderView = (type: string, item: TableNode<T>) => {
    switch (type) {
      case "header":
      case "rowgroup":
      case "section":
      case "row":
      case "headerrow":
        return null;
      case "cell": {
        if (item.props.isSelectionCell) {
          return <TableCheckboxCell cell={item} />;
        }

        if (state.collection.rowHeaderColumnKeys.has(item.column.key)) {
          return <TableRowHeader cell={item} />;
        }

        return <TableCell cell={item} />;
      }
      case "placeholder":
        // TODO: move to react-aria?
        return (
          <div
            role="gridcell"
            aria-colindex={item.index + 1}
            aria-colspan={item.colspan > 1 ? item.colspan : null}
          />
        );
      case "column":
        if (item.props.isSelectionCell) {
          return <TableSelectAllCell column={item} />;
        }

        return <TableColumnHeader column={item} />;
      case "loader":
        return (
          <CenteredWrapper>
            <Spinner
              aria-label={
                state.collection.size > 0 ? "Loading More" : "Loading"
              }
            />
          </CenteredWrapper>
        );
      case "empty": {
        let emptyState = props.renderEmptyState
          ? props.renderEmptyState()
          : null;
        if (emptyState == null) {
          return null;
        }

        return <CenteredWrapper>{emptyState}</CenteredWrapper>;
      }
    }
  };

  const renderRow = ({ index, style }) => {
    console.log(
      state.collection.getItem(state.collection.body.props.items[index].extid)
    );
    const item = state.collection.getItem(
      state.collection.body.props.items[index].extid
    );

    return (
      <TableRow key={index} item={item} style={style}>
        <TableCell
          cell={{
            props: { align: "left" },
            // @ts-ignore
            rendered: <span>{item.value.fullname}</span>,
          }}
        />
      </TableRow>
    );
  };

  return (
    <Box
      borderRadius="8px"
      overflow="hidden"
      bg="white"
      borderColor="gray.200"
      borderStyle="solid"
      borderWidth="1px"
      fontSize="sm"
      // @ts-ignore
      css={{
        ".table-cellContents": {
          whiteSpace:
            props.overflowMode === "wrap" ? "normal !important" : "nowrap",
        },
      }}
    >
      <TableContext.Provider value={state}>
        {/* <List
          height={600}
          itemCount={state.collection.size}
          itemSize={() => 50}
          // width={1000}
          onFocus={() => console.log("focused")}
        >
          {renderRow}
        </List> */}
        <TableVirtualizer
          {...gridProps}
          style={{
            display: "flex",
            flexDirection: "column",
            width: props.width,
            height: props.height,
          }}
          layout={layout}
          collection={state.collection}
          focusedKey={state.selectionManager.focusedKey}
          renderView={renderView}
          renderWrapper={renderWrapper}
          domRef={domRef}
        />
      </TableContext.Provider>
    </Box>
  );
}

export { TableHeader, Row, TableBody, Cell } from "@react-stately/table";
export { default as Column } from "./Column";

export default forwardRef(Table);
