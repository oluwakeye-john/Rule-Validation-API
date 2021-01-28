export const VALIDATION_MESSAGES = {
  SUCCESS: (field: string) => `field ${field} successfully validated.`,
  FAILED_VALIDATION: (field: string) => `field ${field} failed validation.`,
  MISSING: (field: string) => `field ${field} is missing from data.`,
};
