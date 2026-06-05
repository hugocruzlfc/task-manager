import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/config.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { SharedKernelModule } from './shared/kernel/shared-kernel.module';

/**
 * AppModule — Root module.
 *
 * Architecture layers loaded here:
 *  - PrismaModule    (Global — provides PrismaService everywhere)
 *  - SharedKernelModule
 *  - Bounded contexts: Users | Projects | Tasks | Auth
 */
@Module({
  imports: [
    AppConfigModule, // ← debe ir primero: valida env antes de todo
    PrismaModule,
    SharedKernelModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
