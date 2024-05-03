import { Module } from '@nestjs/common';
import { ScriptService } from './script.service';
import { ScriptController } from '@/api/v1/script';
import { ScriptRepository } from '@/repositories/script';

@Module({
  providers: [ScriptService, ScriptRepository],
  controllers: [ScriptController],
})
export class ScriptModule {}
