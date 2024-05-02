import { MigrationInterface, QueryRunner } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { ConfirmCodeTypeEnum } from '@/modules/confirm-code/domain';

const TABLE_NAME = 'confirm_codes';

const table = hCreateTable(TABLE_NAME, [
  {
    name: 'value',
    type: 'varchar',
  },
  {
    name: 'type',
    type: 'enum',
    enum: [
      ConfirmCodeTypeEnum.REGISTRATION,
      ConfirmCodeTypeEnum.UPDATE_PASSWORD,
    ],
  },
  {
    name: 'destination',
    type: 'varchar',
  },
  {
    name: 'live_at',
    type: 'timestamp',
  },
  {
    name: 'delay_at',
    type: 'timestamp',
  },
]);

export class CreateConfirmCodeTable1713520004421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
