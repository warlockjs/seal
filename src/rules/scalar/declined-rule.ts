import { isEmpty } from "@mongez/supportive-is";
import { getFieldValue, invalidRule, VALID_RULE } from "../../helpers";
import type { SchemaRule } from "../../types";

const isDeclinedValue = (value: any) => {
  return ["0", "false", "no", "n", "off", 0, false, "No", "N", "Off"].includes(
    value,
  );
};

/**
 * Validate value as declined if it equals:
 * 0 | "0" | false | "false" | "no" | "n" | "off" | 0 | false | "No" | "N" | "Off"
 */
export const declinedRule: SchemaRule = {
  name: "declined",
  defaultErrorMessage: "The :input must be declined",
  description:
    "The value must be declined if it equals: 0 | '0' | false | 'false' | 'no' | 'n' | 'off' | 0 | false | 'No' | 'N' | 'Off'",
  async validate(value: any, context) {
    if (isDeclinedValue(value)) {
      return VALID_RULE;
    }

    return invalidRule(this, context);
  },
};

/**
 * Declined value if another field's value equals to a specific value
 */
export const declinedIfRule: SchemaRule<{ field: string; value: any }> = {
  name: "declinedIf",
  description:
    "The field must be declined if another field's value equals to a specific value",
  defaultErrorMessage: "The :input must be declined",
  async validate(value: any, context) {
    const fieldValue = getFieldValue(this, context);
    const { value: expectedValue } = this.context.options;
    if (fieldValue !== expectedValue) {
      return invalidRule(this, context);
    }

    if (!isDeclinedValue(value)) {
      return invalidRule(this, context);
    }

    return VALID_RULE;
  },
};

/**
 * Declined if another field is not equal to the given value
 */
export const declinedUnlessRule: SchemaRule<{ field: string; value: any }> = {
  name: "declinedUnless",
  description:
    "The field must be declined if another field's value is not equal to a specific value",
  defaultErrorMessage: "The :input must be declined",
  async validate(value: any, context) {
    const fieldValue = getFieldValue(this, context);
    const { value: expectedValue } = this.context.options;
    if (fieldValue === expectedValue) {
      return invalidRule(this, context);
    }

    if (!isDeclinedValue(value)) {
      return invalidRule(this, context);
    }

    return VALID_RULE;
  },
};

/**
 * Declined if another field is required
 */
export const declinedIfRequiredRule: SchemaRule<{ field: string }> = {
  name: "declinedIfRequired",
  description: "The field must be declined if another field is required",
  defaultErrorMessage: "The :input must be declined",
  async validate(value: any, context) {
    const fieldValue = getFieldValue(this, context);
    if (isEmpty(fieldValue)) {
      return invalidRule(this, context);
    }

    if (!isDeclinedValue(value)) {
      return invalidRule(this, context);
    }

    return VALID_RULE;
  },
};

/**
 * Declined if another field is present
 */
export const declinedIfPresentRule: SchemaRule<{ field: string }> = {
  name: "declinedIfPresent",
  description: "The field must be declined if another field is present",
  defaultErrorMessage: "The :input must be declined",
  async validate(value: any, context) {
    const fieldValue = getFieldValue(this, context);
    if (fieldValue === undefined) {
      return invalidRule(this, context);
    }

    if (!isDeclinedValue(value)) {
      return invalidRule(this, context);
    }

    return VALID_RULE;
  },
};

/**
 * Declined if another field is missing
 */
export const declinedWithoutRule: SchemaRule<{ field: string }> = {
  name: "declinedWithout",
  description: "The field must be declined if another field is missing",
  defaultErrorMessage: "The :input must be declined",
  async validate(value: any, context) {
    const fieldValue = getFieldValue(this, context);
    if (fieldValue !== undefined) {
      return invalidRule(this, context);
    }

    if (!isDeclinedValue(value)) {
      return invalidRule(this, context);
    }

    return VALID_RULE;
  },
};
