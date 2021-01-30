import { VALIDATION_MESSAGES } from "../@types/messages";
import { ValidationPayload } from "../@types/rule";
import Logger from "../logger";

const logger = new Logger("rule-validation");

export const validateField = (
  body: ValidationPayload
): { valid: boolean; message: string; responsePayload: object | null } => {
  const { rule, data } = body;
  const { field, condition, condition_value } = rule;

  try {
    let item = data[field];

    if (typeof data === "object" && field.includes(".")) {
      // for nested objects
      const [first, second] = field.split(".");
      item = data[first][second];
    }

    if (!item) {
      return {
        valid: false,
        message: VALIDATION_MESSAGES.MISSING(field),
        responsePayload: null,
      };
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
      return {
        valid: true,
        message: VALIDATION_MESSAGES.SUCCESS(field),
        responsePayload: {
          error: false,
          field: body.rule.field,
          field_value: data,
          condition: condition,
          condition_value: condition_value,
        },
      };
    } else {
      return {
        valid: false,
        message: VALIDATION_MESSAGES.FAILED_VALIDATION(field),
        responsePayload: null,
      };
    }
  } catch (error) {
    logger.log(error);
    return {
      valid: false,
      message: VALIDATION_MESSAGES.FAILED_VALIDATION(field),
      responsePayload: null,
    };
  }
};
