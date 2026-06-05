import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { databaseConfig } from './database.config';
import { EnvSchema } from './env.schema';
import { redisConfig } from './redis.config';

/**
 * Función de validación que recibe process.env completo y lo pasa por el
 * esquema Zod. Si algo falla, lista TODOS los errores de una vez y lanza
 * una excepción antes de que arranque el servidor.
 */
function validateEnv(config: Record<string, unknown>) {
  const result = EnvSchema.safeParse(config);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    throw new Error(
      `\n❌ Variables de entorno inválidas:\n${issues}\n\nRevisa tu archivo .env`,
    );
  }

  return result.data;
}

/**
 * AppConfigModule — configura y valida el entorno al arranque.
 *
 * isGlobal: true  → ConfigService disponible en TODA la app sin re-importar.
 * load: [...]     → registra cada config con su clave tipada para inyección.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, redisConfig],
      validate: validateEnv,
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
