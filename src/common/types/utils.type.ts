import { Table, TableColumn, TableColumnOptions } from 'typeorm';

export interface HCreateTableOptions {
  columnId: boolean;
  columnCreatedAt: boolean;
  columnUpdatedAt: boolean;
}

export type HCreateTable = (
  name: string,
  columns: TableColumnOptions[],
  options?: Partial<HCreateTableOptions>
) => Table;

export type HCreateTableColumns = (
  options: TableColumnOptions[],
) => TableColumn[];
