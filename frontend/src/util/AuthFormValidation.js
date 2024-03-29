const validateName = (newErrors, form) => {
  if (!form.firstName) {
    newErrors.firstName = "Required";
    newErrors.active = true;
  }
  if (!form.lastName) {
    newErrors.lastName = "Required";
    newErrors.active = true;
  }
  return newErrors;
};

const validateEmail = (newErrors, form) => {
  const regexEmail = ".+\\@.+\\..+";

  if (!form.email.match(regexEmail)) {
    newErrors.email = "Enter a valid email";
    newErrors.active = true;
  }
  return newErrors;
};

const validatePassword = (newErrors, form) => {
  const regexContainsCaps = "^(.*[A-Z]).*$";
  const regexContainsLower = "^(.*[a-z]).*$";
  const regexContainsNumber = "^(.*[0-9]).*$";
  const regexContainsSpecial = "^(.*[!@#$%^&*_=+-]).*$";

  if (form.password.length < 6) {
    newErrors.password = " must be atleast 6 letters";
    newErrors.active = true;
  }

  if (form.password.length > 20) {
    newErrors.password = "cannot be longer than 20 letters";
    newErrors.active = true;
  }

  if (!form.password.match(regexContainsSpecial)) {
    newErrors.password = "must contain a special character";
    newErrors.active = true;
  }

  if (!form.password.match(regexContainsNumber)) {
    newErrors.password = "must contain a number";
    newErrors.active = true;
  }

  if (!form.password.match(regexContainsCaps)) {
    newErrors.password = "must contain a captial letter";
    newErrors.active = true;
  }

  if (!form.password.match(regexContainsLower)) {
    newErrors.password = "must contain a lowercase letter";
    newErrors.active = true;
  }
  return newErrors;
};

const validatePassword2 = (newErrors, form) => {
  if (form.password !== form.password2) {
    newErrors.password2 = "Passwords do not match";
    newErrors.active = true;
  }

  if (!form.password) {
    newErrors.password2 = "Confirming password is required";
    newErrors.active = true;
  }
  return newErrors;
};

const ValidatTandC = (newErrors, form) => {
  if (!form.tandc) {
    newErrors.tandc = "Please Agree to terms and conditions";
    newErrors.active = true;
  }
  return newErrors;
};

export const ValidateAll = (newErrors, form, type) => {
  newErrors = validatePassword(newErrors, form);
  newErrors = validateEmail(newErrors, form);
  if (type === "signup") {
    newErrors = validateName(newErrors, form);
    newErrors = validatePassword2(newErrors, form);
    newErrors = ValidatTandC(newErrors, form);
  }
  return newErrors;
};
