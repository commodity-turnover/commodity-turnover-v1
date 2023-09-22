let required = (val: string | null) => (val ? null : "The field is required");

const nameVlaidation = (input: string) => {
    const regex = /^[a-z ,.'-]+$/i

    return regex.test(input) ? undefined : 'Write a correct name! [a - Z]';
}

const mailValidation = (input: string | null) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regex.test(String(input).toLocaleLowerCase()) ? undefined : 'Must be a mail!';
}

const phoneNumberValidation = (input: string) => {
  const regex = /^\+374\d{8}$/;
  return regex.test(input) ? undefined : 'Write a phone number! ex. +37412345678';
}


let maxLength = (length: number) => (val: string) =>
  val.length > length ? `Input can contain maximum ${length} charackters.` : null;

let minLength = (length: number) => (val: string) =>
  val.length < length ? `Input can contain minimum ${length} charackters.` : null;

let createValidation = (validations: any) => (val: string | number ) => {
  for (let validation of validations) {
    
    const error = validation(val);
    if (error) {
      return error;
    }
  }

  return "";
};

export const signupValidations: any = {
  orgName: createValidation([required, minLength(4), maxLength(36), nameVlaidation]),
  username: createValidation([required, minLength(4), maxLength(36), nameVlaidation]),
  email: createValidation([required, mailValidation]),
  phone: createValidation([required, phoneNumberValidation]),
  password: createValidation([required, minLength(8), maxLength(36)]),
  description: createValidation([minLength(20), maxLength(200)]),
}

export const updateDataValidations: any = {
  orgName: createValidation([required, minLength(4), maxLength(36), nameVlaidation]),
  username: createValidation([required, minLength(4), maxLength(36), nameVlaidation]),
  email: createValidation([required, mailValidation]),
  phone_number: createValidation([required, phoneNumberValidation]),
  description: createValidation([minLength(20), maxLength(200)]),
}

