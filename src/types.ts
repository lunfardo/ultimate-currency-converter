export enum OperationMode {
  Forward = "forward", //left to right convertion operation
  Backward = "backward", //right to left convertion operation
}
export type Rates = Record<string, number>;

export type Currency = {
  name: string;
  key: string;
};
