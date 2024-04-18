import { Module } from '@nestjs/common';
import { TypeormModule } from '@/providers/typeorm';

@Module({
  imports: [TypeormModule],
})
export class ProviderModule {}
