import { isEmpty } from "@mongez/supportive-is";
import { invalidRule, VALID_RULE } from "../../helpers";
import type { SchemaRule } from "../../types";

/**
 * Required rule - value must be present and not empty
 */
export const requiredRule: SchemaRule = {
  name: "required",
  defaultErrorMessage: "The :input is required",
  requiresValue: false,
  sortOrder: -2,
  async validate(value: any, context) {
    if (isEmpty(value)) {
      return invalidRule(this, context);
    }
    return VALID_RULE;
  },
};

/**
 * Present rule - key must exist in the data, but value can be anything
 * (empty string, null, undefined are all valid as long as the key exists)
 */
export const presentRule: SchemaRule = {
  name: "present",
  defaultErrorMessage: "The :input field is required",
  requiresValue: false,
  sortOrder: -2,
  async validate(value: any, context) {
    if (value === undefined) {
      return invalidRule(this, context);
    }

    return VALID_RULE;
  },
};
