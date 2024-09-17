export type Element = {
  [key: string]:
    | string
    | {
        type: string;
        name: string;
        text: string;
      }
    | {
        type: string;
        targetFile: string;
        targetName: string;
        text: string;
      };
};
export type Row = Element[];
export type Pattern = {
  title: string;
  shortDescription: string;
  longDescription: string;
  Examples: Row[];
  UsingThePattern: Row[];
  Consequences: Row[];
  Relations: Row[];
  actionVerbs?: { [key: string]: boolean };
  rawCSVRow?: string[];
};
