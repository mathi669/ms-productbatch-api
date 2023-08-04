import isEmpty from "validator/lib/isEmpty.js";
import ApiException from "../exceptions/api.exception";

class StringValue {
  public value: string;

  /**
   * Constructor
   * @param value string value
   * @param key key to show better error message (OPTIONAL)
   */
  constructor(value: string, key?: string, canEmpty?: boolean) {
    this.value = value;

    if (!canEmpty && this.checkIsEmpty()) {
      throw new ApiException(400, `The ${key ? key : "value"} can't be empty`);
    }

    if (
      this.value != null &&
      this.value != undefined &&
      !this.validateIsString()
    ) {
      throw new ApiException(400, `The ${key ? key : "value"} is not a string`);
    }
  }

  /**
   * Check if current value is a string
   * @returns true if value is a string
   */
  private validateIsString() {
    return typeof this.value === "string";
  }

  /**
   * Check if current value is empty
   * @returns true if value is empty
   */
  private checkIsEmpty(): boolean {
    return this?.value ? isEmpty(this.value + "") : true;
  }
}

export default StringValue;
