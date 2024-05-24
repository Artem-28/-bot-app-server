import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { USER_TABLE } from '@/models/user';
import { PROJECT_TABLE } from '@/models/project';

const table = hCreateTable(PROJECT_TABLE, [
  {
    name: 'user_id',
    type: 'int',
  },
  {
    name: 'title',
    type: 'varchar',
  },
]);

const foreignKeys = [
  new TableForeignKey({
    name: 'fk_project_user',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: USER_TABLE,
    onDelete: 'CASCADE',
  }),
];

export class CreateProjectTable1714638208810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKeys(table, foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(table, foreignKeys);
    await queryRunner.dropTable(table);
  }
}
