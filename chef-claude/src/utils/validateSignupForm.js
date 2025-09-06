import validEmail from "./validEmail.js"

function validateSignupForm(email, password, firstName, lastName, confirmPassword) {
    if (!validEmail(email)) {
        return "Please enter a valid email address";
      }
  
      if (email.trim().length === 0 || password.trim().length === 0 || firstName.trim().length === 0 || lastName.trim().length === 0 || confirmPassword.trim().length === 0) {
        return "Please enter all fields";
      }
  
      if (password != confirmPassword) {
        return "Both passwords must match";
      }

      return null;
}

export default validateSignupForm;