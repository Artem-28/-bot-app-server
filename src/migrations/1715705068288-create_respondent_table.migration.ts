import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { PROJECT_TABLE } from '@/models/project';
import { RESPONDENT_TABLE } from '@/models/respondent';

const table = hCreateTable(RESPONDENT_TABLE, [
  {
    name: 'project_id',
    type: 'int',
  },
  {
    name: 'uuid',
    type: 'varchar',
  },
  {
    name: 'name',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'last_name',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'surname',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'email',
    type: 'varchar',
    isNullable: true,
  },
  {
    name: 'phone',
    type: 'varchar',
    isNullable: true,
  },
]);

const foreignKeys = [
  new TableForeignKey({
    name: 'fk_project_respondent',
    columnNames: ['project_id'],
    referencedColumnNames: ['id'],
    referencedTableName: PROJECT_TABLE,
    onDelete: 'CASCADE',
  }),
];

const tableIndex = new TableIndex({
  name: 'fk_project_uuid',
  columnNames: ['project_id', 'uuid'],
  isUnique: true,
});

export class CreateRespondentTable1715705068288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKeys(table, foreignKeys);
    await queryRunner.createIndex(table, tableIndex);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(table, foreignKeys);
    await queryRunner.dropIndex(table, tableIndex);
    await queryRunner.dropTable(table);
  }
}
