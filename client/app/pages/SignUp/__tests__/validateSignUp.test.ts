import { validateSignUp } from '../use-cases/validateSignUp';

describe('validateSignUp', () => {
  it('should return valid for correct input', () => {
    const result = validateSignUp(
      'John Doe',
      'test@example.com',
      'password123',
      'password123'
    );
    expect(result.isValid).toBe(true);
    expect(result.nameError).toBeUndefined();
    expect(result.emailError).toBeUndefined();
    expect(result.passwordError).toBeUndefined();
    expect(result.confirmPasswordError).toBeUndefined();
  });

  it('should return invalid for empty name', () => {
    const result = validateSignUp(
      '',
      'test@example.com',
      'password123',
      'password123'
    );
    expect(result.isValid).toBe(false);
    expect(result.nameError).toBe('Name is required');
  });

  it('should return invalid for name shorter than 2 characters', () => {
    const result = validateSignUp(
      'J',
      'test@example.com',
      'password123',
      'password123'
    );
    expect(result.isValid).toBe(false);
    expect(result.nameError).toBe('Name must be at least 2 characters');
  });

  it('should return invalid for empty email', () => {
    const result = validateSignUp(
      'John Doe',
      '',
      'password123',
      'password123'
    );
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('Email is required');
  });

  it('should return invalid for invalid email format', () => {
    const result = validateSignUp(
      'John Doe',
      'invalid-email',
      'password123',
      'password123'
    );
    expect(result.isValid).toBe(false);
    expect(result.emailError).toBe('Invalid email format');
  });

  it('should return invalid for empty password', () => {
    const result = validateSignUp(
      'John Doe',
      'test@example.com',
      '',
      'password123'
    );
    expect(result.isValid).toBe(false);
    expect(result.passwordError).toBe('Password is required');
  });

  it('should return invalid for password shorter than 6 characters', () => {
    const result = validateSignUp(
      'John Doe',
      'test@example.com',
      '12345',
      '12345'
    );
    expect(result.isValid).toBe(false);
    expect(result.passwordError).toBe('Password must be at least 6 characters');
  });

  it('should return invalid for empty confirm password', () => {
    const result = validateSignUp(
      'John Doe',
      'test@example.com',
      'password123',
      ''
    );
    expect(result.isValid).toBe(false);
    expect(result.confirmPasswordError).toBe('Please confirm your password');
  });

  it('should return invalid for non-matching passwords', () => {
    const result = validateSignUp(
      'John Doe',
      'test@example.com',
      'password123',
      'different123'
    );
    expect(result.isValid).toBe(false);
    expect(result.confirmPasswordError).toBe('Passwords do not match');
  });

  it('should return invalid for multiple errors', () => {
    const result = validateSignUp(
      '',
      'invalid-email',
      '12345',
      'different123'
    );
    expect(result.isValid).toBe(false);
    expect(result.nameError).toBe('Name is required');
    expect(result.emailError).toBe('Invalid email format');
    expect(result.passwordError).toBe('Password must be at least 6 characters');
    expect(result.confirmPasswordError).toBe('Passwords do not match');
  });
}); 