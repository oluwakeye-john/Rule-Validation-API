import { ValidationPayload } from "../@types/rule";

export const invalid: any[] = [
  { rule: null, data: { hello: "world" } },
  { rule: { field: "2", condition: "eq", condition_value: "8" }, data: "019" },
];

export const valid: ValidationPayload[] = [
  { rule: { field: "2", condition: "eq", condition_value: "8" }, data: "018" },
  {
    rule: { field: "1", condition: "contains", condition_value: "no" },
    data: ["yes", "no"],
  },
  {
    rule: { field: "mission", condition: "gte", condition_value: 92 },
    data: {
      mission: 93,
    },
  },
];
