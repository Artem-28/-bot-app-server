import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { hCreateTable } from '@/common/utils';
import { CHAT_CLIENT_TABLE, CHAT_TABLE } from '@/models/chat';

const table = hCreateTable(CHAT_CLIENT_TABLE, [
  {
    name: 'chat_id',
    type: 'int',
  },
  {
    name: 'socket_id',
    type: 'varchar',
  },
  {
    name: 'user_id',
    type: 'int',
    isNullable: true,
  },
  {
    name: 'respondent_id',
    type: 'int',
    isNullable: true,
  },
  {
    name: 'last_active_at',
    type: 'timestamp',
  },
]);

const foreignKeys = [
  new TableForeignKey({
    name: 'fk_chat-client_project',
    columnNames: ['chat_id'],
    referencedColumnNames: ['id'],
    referencedTableName: CHAT_TABLE,
    onDelete: 'CASCADE',
  }),
];

export class CreateChatClientTable1717401958220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKeys(table, foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(table, foreignKeys);
    await queryRunner.dropTable(table);
  }
}
