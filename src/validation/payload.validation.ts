import joi from "joi";

export const ruleRequestValidation = (data: any) => {
  const schema = joi
    .object({
      rule: joi
        .object({
          field: joi.string().required().messages({
            "string.base": "field should be a string",
          }),
          condition: joi.valid("gte", "eq", "neq", "gt", "contains").required(),
          condition_value: joi.any().required(),
        })
        .required()
        .messages({
          "object.base": "rule should be an object",
        }),
      data: joi
        .alternatives()
        .try(joi.string(), joi.array(), joi.object())
        .required(),
    })
    .unknown(false);

  return schema.validate(data)?.error?.details[0]?.message;
};
