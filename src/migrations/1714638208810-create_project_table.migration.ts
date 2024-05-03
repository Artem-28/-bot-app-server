import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { USER_TABLE, PROJECT_TABLE } from '@/entities';

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

export class CreateProjectTable1714638208810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);

    const userForeignKey = new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: USER_TABLE,
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey(table, userForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
