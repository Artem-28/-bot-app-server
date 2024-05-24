import { Module } from '@nestjs/common';
import { ScriptController } from '@/modules/script/controller';
import { ScriptService } from '@/modules/script/service';
import { ScriptRepository } from '@/repositories/script';

@Module({
  providers: [ScriptService, ScriptRepository],
  controllers: [ScriptController],
})
export class ScriptModule {}
