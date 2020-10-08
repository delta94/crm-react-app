import { Box } from "@chakra-ui/core";
import { FocusRing } from "@react-aria/focus";
import { SpectrumColumnProps } from "@react-types/table";
import React from "react";

const TableCellBase = ({ cell, cellRef, ...otherProps }) => {
  let columnProps = cell.column.props as SpectrumColumnProps<unknown>;

  return (
    <FocusRing
    // focusRingClass={classNames(styles, 'focus-ring')}
    >
      <Box
        {...otherProps}
        px={4}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
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
        >
          {cell.rendered}
        </span>
      </Box>
    </FocusRing>
  );
};

export default TableCellBase;