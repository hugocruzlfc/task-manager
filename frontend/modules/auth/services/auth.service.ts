/**
 * AuthService is no longer needed — all auth operations are handled
 * by better-auth client in lib/auth-client.ts.
 *
 * Kept as re-export for backward compatibility.
 */
export {
  authClient,
  signIn,
  signUp,
  signOut,
  useSession,
} from '../lib/auth-client';
