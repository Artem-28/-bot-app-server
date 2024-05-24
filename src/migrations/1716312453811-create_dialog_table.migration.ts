import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { DIALOG_TABLE } from '@/entities';
import { PROJECT_TABLE } from '@/models/project';
import { SCRIPT_TABLE } from '@/models/script';
import { RESPONDENT_TABLE } from '@/models/respondent';

const table = hCreateTable(DIALOG_TABLE, [
  {
    name: 'project_id',
    type: 'int',
  },
  {
    name: 'script_id',
    type: 'int',
  },
  {
    name: 'respondent_id',
    type: 'int',
  },
]);

const foreignKeys = [
  new TableForeignKey({
    name: 'fk_dialog_project',
    columnNames: ['project_id'],
    referencedColumnNames: ['id'],
    referencedTableName: PROJECT_TABLE,
    onDelete: 'CASCADE',
  }),
  new TableForeignKey({
    name: 'fk_dialog_script',
    columnNames: ['script_id'],
    referencedColumnNames: ['id'],
    referencedTableName: SCRIPT_TABLE,
    onDelete: 'CASCADE',
  }),
  new TableForeignKey({
    name: 'fk_dialog_respondent',
    columnNames: ['respondent_id'],
    referencedColumnNames: ['id'],
    referencedTableName: RESPONDENT_TABLE,
    onDelete: 'CASCADE',
  }),
];

export class CreateDialogTable1716312453811 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKeys(table, foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(table, foreignKeys);
    await queryRunner.dropTable(table);
  }
}
