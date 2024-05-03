import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { PROJECT_TABLE, SCRIPT_TABLE } from '@/entities';

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

export class CreateScriptTable1714722739266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    const projectForeignKey = new TableForeignKey({
      columnNames: ['project_id'],
      referencedColumnNames: ['id'],
      referencedTableName: PROJECT_TABLE,
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('scripts', projectForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
