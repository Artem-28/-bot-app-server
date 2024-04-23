import { Brackets, Table, TableColumn, TableColumnOptions } from 'typeorm';
import { IOrder, IPagination } from '@/common/types/base.type';

export interface HCreateTableOptions {
  columnId: boolean;
  columnCreatedAt: boolean;
  columnUpdatedAt: boolean;
}

export type HCreateTable = (
  name: string,
  columns: TableColumnOptions[],
  options?: Partial<HCreateTableOptions>,
) => Table;

export type HCreateTableColumns = (
  options: TableColumnOptions[],
) => TableColumn[];

export interface HQueryBuilderFilter {
  field: string;
  value?: any | any[];
  operator?: 'and' | 'or';
  callback?: (filter: HQueryBuilderOptions) => Brackets;
}

export interface HQueryBuilderOptions {
  alias?: string;
  order?: IOrder | IOrder[];
  filter?: HQueryBuilderFilter | HQueryBuilderFilter[];
  pagination?: IPagination;
}
