import { ValidationPayload } from "../@types/rule";

export const validateField = (body: ValidationPayload): boolean => {
  const { rule, data } = body;
  const { field, condition, condition_value } = rule;

  const nestedFields = field.split(".");

  let isValid = false;

  switch (rule.condition) {
    case "contains": {
      if (data.includes(field)) {
        isValid = true;
      } else {
        isValid = false;
      }
      break;
    }
    default: {
      isValid = false;
      break;
    }
  }

  return isValid;
};
