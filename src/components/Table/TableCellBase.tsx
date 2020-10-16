import { Box } from "@chakra-ui/core";
import { FocusRing } from "@react-aria/focus";
import { SpectrumColumnProps } from "@react-types/table";
import React from "react";

const TableCellBase = ({ cell, cellRef, ...otherProps }) => {
  let { align } = cell.column.props as SpectrumColumnProps<unknown>;

  return (
    <FocusRing
    // focusRingClass={classNames(styles, 'focus-ring')}
    >
      <Box
        {...otherProps}
        px={4}
        py={2}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        position="relative"
        boxSizing="border-box"
        justifyContent={
          align === "center"
            ? "center"
            : align === "end"
            ? "flex-end"
            : align === "start"
            ? "flex-start"
            : "initial"
        }
        ref={cellRef}
        // id="asdasdas"
        // className={
        //   classNames(
        //     styles,
        //     'spectrum-Table-cell',
        //     {
        //       'spectrum-Table-cell--divider': columnProps.showDivider
        //     },
        //     classNames(
        //       stylesOverrides,
        //       'react-spectrum-Table-cell',
        //       {
        //         'react-spectrum-Table-cell--alignCenter': columnProps.align === 'center',
        //         'react-spectrum-Table-cell--alignEnd': columnProps.align === 'end'
        //       }
        //     )
        //   )
        // }
      >
        <span
          // className={classNames(styles, 'spectrum-Table-cellContents')}
          className="table-cellContents"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {cell.rendered}
        </span>
      </Box>
    </FocusRing>
  );
};

export default TableCellBase;
