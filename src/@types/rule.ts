export interface ValidationPayload {
  rule: {
    field: string;
    condition: "eq" | "neq" | "gt" | "gte" | "contains";
    condition_value: any;
  };
  data: any;
}
