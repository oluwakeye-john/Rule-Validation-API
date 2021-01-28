import { VALIDATION_MESSAGES } from "../@types/messages";
import { ValidationPayload } from "../@types/rule";

export const validateField = (
  body: ValidationPayload
): { valid: boolean; message: string } => {
  const { rule, data } = body;
  const { field, condition, condition_value } = rule;

  try {
    const item = data[field];

    if (!item) {
      return { valid: false, message: VALIDATION_MESSAGES.MISSING(field) };
    }

    let isConditionValid = false;

    switch (condition) {
      case "contains": {
        if (item.includes(condition_value)) isConditionValid = true;
        break;
      }
      case "eq": {
        if (item === condition_value) isConditionValid = true;
        break;
      }
      case "gt": {
        if (item > condition_value) isConditionValid = true;
        break;
      }
      case "gte": {
        if (item >= condition_value) isConditionValid = true;
        break;
      }
      case "neq": {
        if (item !== condition_value) isConditionValid = true;
        break;
      }
      default: {
        isConditionValid = false;
        break;
      }
    }

    if (isConditionValid) {
      return { valid: true, message: VALIDATION_MESSAGES.SUCCESS(field) };
    } else {
      return {
        valid: false,
        message: VALIDATION_MESSAGES.FAILED_VALIDATION(field),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      valid: false,
      message: VALIDATION_MESSAGES.FAILED_VALIDATION(field),
    };
  }
};
