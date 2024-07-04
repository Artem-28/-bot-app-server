import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { PROJECT_TABLE } from '@/models/project';
import { SCRIPT_TABLE } from '@/models/script';

const table = hCreateTable(SCRIPT_TABLE, [
  {
    name: 'project_id',
    type: 'int',
  },
  {
    name: 'title',
    type: 'varchar',
  },
]);

const foreignKeys = [
  new TableForeignKey({
    name: 'fk_script_project',
    columnNames: ['project_id'],
    referencedColumnNames: ['id'],
    referencedTableName: PROJECT_TABLE,
    onDelete: 'CASCADE',
  }),
];

export class CreateScriptTable1714722739266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKeys(table, foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(table, foreignKeys);
    await queryRunner.dropTable(table);
  }
}
