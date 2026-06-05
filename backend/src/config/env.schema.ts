import { z } from 'zod';

/**
 * EnvSchema — valida todas las variables de entorno al arrancar la aplicación.
 * Si falta alguna variable requerida o tiene un formato incorrecto,
 * la app lanza un error descriptivo y NO arranca.
 */
export const EnvSchema = z.object({
  // ── General ─────────────────────────────────────────────────────────────
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3001),

  // ── Base de datos ────────────────────────────────────────────────────────
  DATABASE_URL: z.url('DATABASE_URL debe ser una URL válida'),

  // ── Redis ────────────────────────────────────────────────────────────────
  REDIS_URL: z.url('REDIS_URL debe ser una URL válida'),

  // ── Better Auth ──────────────────────────────────────────────────────────
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, 'BETTER_AUTH_SECRET debe tener mínimo 32 caracteres'),
  BETTER_AUTH_URL: z.string().default('http://localhost:3001'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
});

export type Env = z.infer<typeof EnvSchema>;
