type BoxProps = typeof import("./components/Box/types").BoxProps;

declare module "MyTypes" {
  export type RootState = import("../store/index").RootState;

  export type ModalsState = {
    textStyle: {
      location?: {
        x: number;
        y: number;
      };
      isVisible: boolean;
      editMode?: boolean;
      id?: string;
      name?: string;
      fontFamily?: string;
      fontSize?: string;
      lineHeight?: string;
      fontWeight?: string;
      letterSpacing?: string;
    };
  };

  export type User = {
    token: string;
  };

  export type PaynetTransaction = {
    id: string;
    providerid: string;
    withdraw: number;
    reward: number;
    purpose: string;
    createdon: string;
    state: string;
  };
}
