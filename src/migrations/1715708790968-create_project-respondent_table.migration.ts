import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { hCreateTable } from '@/common/utils';
import {
  PROJECT_RESPONDENT_TABLE,
  PROJECT_TABLE,
  RESPONDENT_TABLE,
} from '@/entities';

const table = hCreateTable(PROJECT_RESPONDENT_TABLE, [
  {
    name: 'project_id',
    type: 'int',
  },
  {
    name: 'respondent_id',
    type: 'int',
  },
]);

const foreignKeys = [
  new TableForeignKey({
    columnNames: ['project_id'],
    referencedColumnNames: ['id'],
    referencedTableName: PROJECT_TABLE,
    onDelete: 'CASCADE',
  }),

  new TableForeignKey({
    columnNames: ['respondent_id'],
    referencedColumnNames: ['id'],
    referencedTableName: RESPONDENT_TABLE,
    onDelete: 'CASCADE',
  }),
];
const uniqueConstraint = new TableIndex({
  name: 'unique_project_respondent',
  columnNames: ['project_id', 'respondent_id'],
  isUnique: true,
});

export class CreateProjectRespondentTable1715708790968
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKeys(table, foreignKeys);
    // Добавление уникального индекса
    await queryRunner.createIndex(table, uniqueConstraint);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(table, foreignKeys);
    await queryRunner.dropIndex(table, uniqueConstraint);
    await queryRunner.dropTable(table);
  }
}
