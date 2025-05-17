import { hashPassword, comparePassword } from './encryption.js';

describe('Encryption utils', () => {
  const password = 'Password123*';
  test('HASH - should hash a password', async () => {
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword).toHaveLength(60);
  });

  test('COMPARE - should compare a password with a hash', async () => {
    const hashedPassword = await hashPassword(password);
    const isMatch = await comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  test('COMPARE - should return false for incorrect password', async () => {
    const hashedPassword = await hashPassword(password);
    const isMatch = await comparePassword('WrongPassword', hashedPassword);
    expect(isMatch).toBe(false);
  });
  test('HASH - should return different hashes for the same password', async () => {
    const hashedPassword1 = await hashPassword(password);
    const hashedPassword2 = await hashPassword(password);
    expect(hashedPassword1).not.toBe(hashedPassword2);
  });
});
