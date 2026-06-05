import { registerAs } from '@nestjs/config';

export const JWT_CONFIG_KEY = 'jwt' as const;

export interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  accessExpiration: string;
  refreshExpiration: string;
}

/**
 * jwtConfig — factory registrada con clave 'jwt'.
 *
 * Inyección en cualquier servicio:
 *   @Inject(jwtConfig.KEY) private readonly jwt: JwtConfig
 */
export const jwtConfig = registerAs<JwtConfig>(
  JWT_CONFIG_KEY,
  (): JwtConfig => ({
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessExpiration: process.env.ACCESS_TOKEN_EXPIRATION ?? '15m',
    refreshExpiration: process.env.REFRESH_TOKEN_EXPIRATION ?? '7d',
  }),
);
