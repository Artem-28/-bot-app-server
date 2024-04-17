import {
  HCreateTable,
  HCreateTableColumns,
  HCreateTableOptions,
} from '@/common';
import { TableColumn, Table } from 'typeorm';

export const hCreateTable: HCreateTable = (name, columns, options?) => {
  const opt = Object.assign<HCreateTableOptions, Partial<HCreateTableColumns>>(
    { columnId: true, columnCreatedAt: true, columnUpdatedAt: true },
    options,
  );
  if (opt.columnId) {
    columns.unshift({
      name: 'id',
      type: 'int',
      isGenerated: true,
      isPrimary: true,
      generationStrategy: 'increment',
    });
  }
  if (opt.columnCreatedAt) {
    columns.push({
      name: 'created_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP',
    });
  }
  if (opt.columnUpdatedAt) {
    columns.push({
      name: 'updated_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    });
  }
  return new Table({ name: name, columns: hCreateTableColumns(columns) });
};

export const hCreateTableColumns: HCreateTableColumns = (options) => {
  return options.map((opt) => new TableColumn(opt));
};
