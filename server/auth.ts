import bcrypt from 'bcrypt';
import { getAdminUserByEmail, createAdminUser } from './db';

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Authenticate admin user with email and password
 */
export async function authenticateAdmin(email: string, password: string) {
  const user = await getAdminUserByEmail(email);
  
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  
  if (!isValid) {
    return null;
  }

  return user;
}

/**
 * Register a new admin user
 */
export async function registerAdmin(email: string, password: string, name?: string) {
  const existingUser = await getAdminUserByEmail(email);
  
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const passwordHash = await hashPassword(password);
  return createAdminUser({ email, passwordHash, name });
}
