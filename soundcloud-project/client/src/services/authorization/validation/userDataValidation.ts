
// checking the email
export const isUserEmailValid = (email: string) => {
  // regex (i know how its work)
  return /[A-Za-z0-9._-]+@(?!-)[A-Za-z0-9]+\.[a-zA-Z]{2,}$/.test(email);
};

// checking the password
export const isUserPasswordValid = (password: string) => {
  // regex (i know how its work)
  return /^(?=.*[A-Za-z0-9])[A-Za-z0-9-_!@#$%^&*()+].{8,}$/.test(password);
};



