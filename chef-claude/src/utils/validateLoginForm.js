function validateLoginForm(email, password) {
    if (email.trim().length === 0 || password.trim().length === 0) {
        return "Please enter all fields";
    }

    return null;
}

export default validateLoginForm;