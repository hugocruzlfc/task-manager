import { registerAs } from '@nestjs/config';

export const DATABASE_CONFIG_KEY = 'database' as const;

export interface DatabaseConfig {
  url: string;
}

/**
 * databaseConfig — factory registrada con clave 'database'.
 *
 * Inyección en cualquier servicio:
 *   @Inject(databaseConfig.KEY) private readonly db: DatabaseConfig
 */
export const databaseConfig = registerAs<DatabaseConfig>(
  DATABASE_CONFIG_KEY,
  (): DatabaseConfig => ({
    url: process.env.DATABASE_URL!,
  }),
);
