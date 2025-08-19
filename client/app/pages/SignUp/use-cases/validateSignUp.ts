export interface SignUpValidationResult {
  isValid: boolean;
  nameError?: string;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
}

const validateSignUp = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): SignUpValidationResult => {
  const result: SignUpValidationResult = {
    isValid: true
  };

  // Name validation
  if (!name) {
    result.isValid = false;
    result.nameError = 'Name is required';
  } else if (name.length < 2) {
    result.isValid = false;
    result.nameError = 'Name must be at least 2 characters';
  }

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
  } else if (password.length < 6) {
    result.isValid = false;
    result.passwordError = 'Password must be at least 6 characters';
  }

  // Confirm password validation
  if (!confirmPassword) {
    result.isValid = false;
    result.confirmPasswordError = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    result.isValid = false;
    result.confirmPasswordError = 'Passwords do not match';
  }

  return result;
};

export default validateSignUp;