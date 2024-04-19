import { MigrationInterface, QueryRunner } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { ConfirmCodeTypeEnum } from '@/modules/confirm-code/domain';

const TABLE_NAME = 'confirm_codes';

export class CreateConfirmCodeTable1713520004421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = hCreateTable(TABLE_NAME, [
      {
        name: 'value',
        type: 'varchar',
      },
      {
        name: 'type',
        type: 'enum',
        enum: [ConfirmCodeTypeEnum.REGISTRATION],
      },
      {
        name: 'destination',
        type: 'varchar',
      },
      {
        name: 'expiration_date',
        type: 'timestamp',
      },
    ]);
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
