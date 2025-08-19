import { validateLogin } from '../use-cases/validateLogin';

describe('validateLogin', () => {
  it('should return valid for correct email and password', () => {
    const result = validateLogin('test@example.com', 'password123');
    expect(result.isValid).toBe(true);
    expect(result.emailError).toBeUndefined();
    expect(result.passwordError).toBeUndefined();
  });

  it('should return invalid for empty email', () => {
    const result = validateLogin('', 'password123');
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('Email is required');
    expect(result.passwordError).toBeUndefined();
  });

  it('should return invalid for empty password', () => {
    const result = validateLogin('test@example.com', '');
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBeUndefined();
    expect(result.passwordError).toBe('Password is required');
  });

  it('should return invalid for invalid email format', () => {
    const result = validateLogin('invalid-email', 'password123');
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('Invalid email format');
    expect(result.passwordError).toBeUndefined();
  });

  it('should return invalid for password shorter than 6 characters', () => {
    const result = validateLogin('test@example.com', '12345');
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBeUndefined();
    expect(result.passwordError).toBe('Password must be at least 6 characters');
  });

  it('should return invalid for both empty email and password', () => {
    const result = validateLogin('', '');
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('Email is required');
    expect(result.passwordError).toBe('Password is required');
  });

  it('should return invalid for invalid email format and short password', () => {
    const result = validateLogin('invalid-email', '12345');
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('Invalid email format');
    expect(result.passwordError).toBe('Password must be at least 6 characters');
  });
}); 