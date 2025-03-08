import validator from 'validator';

export class Validators {
  static isValidId(value: number, varName: string): void {
    if (value <= 0) {
      throw new Error(`${varName} can not be smaller than or equal to zero.`);
    }
  }

  static isValidUsernameOrEmail(value: string): void {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(value)) {
      const trimmedValue = value.trim();

      if (!validator.isEmail(trimmedValue)) {
        throw new Error(`Invalid email format.`);
      }
    }
  }

  static isPositiveNumber(
    value: number,
    varName: string = 'years of experience'
  ): void {
    if (value < 0) {
      throw new Error(`${varName} must be a positive number.`);
    }
  }

  static isName(value: string, varName: string): void {
    if (!validator.isAlpha(value, 'en-US', { ignore: ' -' })) {
      throw new Error(`${varName} must contain only letters`);
    }

    if (!validator.isLength(value, { min: 2, max: 50 })) {
      throw new Error(`${varName} must be between 2 and 50 characters long.`);
    }
  }
  static isValidPassword(value: string): void {
    if (/\s/.test(value)) {
      throw new Error(`password must not contain spaces.`);
    }
  }

  static isValidPersonalNumber(value: string): void {
    const sanitizedPnr = value.replace(/-/g, '');
    if (!validator.isNumeric(sanitizedPnr)) {
      throw new Error(`pnr must contain only numeric digits.`);
    }
  }

  static isValidDate(value: Date, varName: string): void {
    const dateStr =
      value instanceof Date ? value.toISOString().split('T')[0] : value;

    if (
      !validator.isDate(dateStr, { format: 'YYYY-MM-DD', strictMode: true })
    ) {
      throw new Error(`${varName} must be a valid date format YYYY-MM-DD`);
    }
  }
}
