import { registerAs } from '@nestjs/config';

export const REDIS_CONFIG_KEY = 'redis' as const;

export interface RedisConfig {
  url: string;
}

/**
 * redisConfig — factory registrada con clave 'redis'.
 *
 * Inyección en cualquier servicio:
 *   @Inject(redisConfig.KEY) private readonly redis: RedisConfig
 */
export const redisConfig = registerAs<RedisConfig>(
  REDIS_CONFIG_KEY,
  (): RedisConfig => ({
    url: process.env.REDIS_URL!,
  }),
);
