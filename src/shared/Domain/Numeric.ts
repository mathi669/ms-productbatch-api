import isEmpty from "validator/lib/isEmpty.js";
import isNumeric from "validator/lib/isNumeric.js";
import ApiException from "../exceptions/api.exception";

class Numeric {
  public value: number;

  /**
   * Constructor
   * @param value number value
   * @param key key to show better error message (OPTIONAL)
   */
  constructor(value: number, key?: string, canEmpty?: boolean) {
    this.value = value;

    if (!canEmpty && this.checkIsEmpty()) {
      return null
      // throw new ApiException(400, `The ${key ? key : "value"} can't be empty`);
    }

    if (
      this.value != null &&
      this.value != undefined &&
      !this.validateNumeric()
    ) {
      throw new ApiException(
        400,
        `The ${key ? key : "value"} is not a valid number`
      );
    }
  }

  /**
   * Check if current value is a numeric
   * @returns true if value has the correct numeric format
   */
  private validateNumeric() {
    return isNumeric(this.value + "");
  }

  /**
   * Check if current value is empty
   * @returns true if value is empty
   */
  private checkIsEmpty(): boolean {
    if (this.value !== 0) {
      return this?.value ? isEmpty(this.value + "") : true;
    }
    return false;
  }
}

export default Numeric;