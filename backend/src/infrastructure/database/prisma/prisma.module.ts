import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

/**
 * PrismaModule — Infrastructure Layer
 * Marked as @Global so PrismaService is available everywhere without re-importing.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
