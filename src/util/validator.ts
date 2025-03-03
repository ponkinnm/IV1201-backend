import validator from 'validator';

export class Validators {

    static isValidId(value : any, varName : string): void {
        Validators.isInteger(value, varName);
        if(value <= 0){
            throw new Error(`${varName} can not be smaller than or equal to zero.`);
        }
    }



    static isValidUsernameOrEmail(value: any): void {    
        Validators.isString(value, "email");
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/; // Regex for alphanumeric characters, underscores, and dashes
        if (!usernameRegex.test(value)) {
            const trimmedValue = value.trim();
        
            if (!validator.isEmail(trimmedValue)) {
                throw new Error(`Invalid email format.`);
            }
        }
    
    }


    static isPositivNumber(value : any, varName :string = "year of experince") : void {
        Validators.isInteger(value, varName);
        if( value < 0){
            throw new Error(`${varName} must be a positive number.`);
        }
    }

    static isName(value : any, varName :string) : void {
        Validators.isString(value, varName );

        if (!validator.isAlpha(value, 'en-US', { ignore: " -" })) {
            throw new Error(`${varName} must contain only letters`);
        }
        
        if (!validator.isLength(value, { min: 2, max: 50 })) {
            throw new Error(`${varName} must be between 2 and 50 characters long.`);
        }
    }
    static isValidPassword(value: any): void {
        Validators.isString(value, "password");
        if (/\s/.test(value)) {
            throw new Error(`password must not contain spaces.`);
        }
    }

    static isValidPersonalNumber(value: any): void {
        Validators.isString(value, "pnr" );
        const sanitizedPnr = value.replace(/-/g, '');
        if (!validator.isNumeric(sanitizedPnr)) {
            throw new Error(`pnr must contain only numeric digits.`);
        }
    }

    static isValidDate(value: any, varName: string): void {

        const dateStr = value instanceof Date ? value.toISOString().split('T')[0] : value;

        if(!validator.isDate(dateStr, {format : 'YYYY-MM-DD',strictMode: true})){
            throw new Error('${varName} must be a valid date format YYYY-MM-DD')
        }
    }

 

    static isString(value: any, varName: string){
        if (typeof value !== 'string'){
            throw new Error(`${varName} must be a string`);
        }
    }

    static isInteger(value : any, varName: string){
        if( typeof value !== 'number' || Number.isNaN(value)){
            throw new Error(`${varName} must be a valid number.`);
        }
    }
}