export const validateDateRange = (_, value) => {
  const startDate = new Date("1900-01-01");
  const today = new Date();
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const selectedDate = new Date(value);
  if (!value || (selectedDate >= startDate && selectedDate <= endDate)) {
    return Promise.resolve();
  }

  return Promise.reject(new Error("Select the correct date of birth"));
};

export const fullNameValidationRules = [
  { required: true, message: "Please input your full name!" },
  { min: 5, message: "Enter at least 5 characters!" },
  {
    pattern: /^[a-zA-Z]*$/,
    message: "The input can only contain letters!",
  },
];

export const birthValidationsRules = [
  { required: true, message: "Please input your date of birth!" },
  { validator: validateDateRange },
];

export const emailValidationRules = [
  {
    required: true,
    type: "email",
    message: "Please input your email!",
  },
];

export const sourceValidationRules = [
  { required: true, message: "Please choose one of the options!" },
];
