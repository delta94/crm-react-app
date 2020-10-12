import { Column as StatelyColumn } from "@react-stately/table";
import { SpectrumColumnProps } from "@react-types/table";

const Column = StatelyColumn as <T>(
  props: SpectrumColumnProps<T>
) => JSX.Element;

export default Column;
