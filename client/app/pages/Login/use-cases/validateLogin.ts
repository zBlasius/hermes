export interface LoginValidationResult {
  isValid: boolean;
  emailError?: string;
  passwordError?: string;
}

const validateLogin = (email: string, password: string): LoginValidationResult => {
  const result: LoginValidationResult = {
    isValid: true
  };

  // Email validation
  if (!email) {
    result.isValid = false;
    result.emailError = 'Email is required';
  } else {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
      result.isValid = false;
      result.emailError = 'Invalid email format';
    }
  }

  // Password validation
  if (!password) {
    result.isValid = false;
    result.passwordError = 'Password is required';
  } else if (password.length <= 6) {
    result.isValid = false;
    result.passwordError = 'Password must be at least 6 characters';
  }

  return result;
}; 

export default validateLogin