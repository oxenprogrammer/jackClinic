import Validator from 'validatorjs';

const rules = {
    fullName: 'required|min:3|max:30',
    specialization: 'required|min:3|max:30',
    phone: 'required|numeric',
    postalAddress: 'required|min:3|max: 50',
    city: 'required|min:3|max: 30',
    priceRate: 'required|numeric',
    password: 'required|min:5|max: 20',
    // password2: 'required|min:5|max:20'
    
  };
  
  export const singleFieldValidation = ({key, value}) => {
    const validationResponse = {isValid: true};
    if (rules[key]) {
      const validation = new Validator({[key]: value}, {[key]: rules[key]});
      validationResponse.isValid = validation.passes();
      if (!validationResponse.isValid) {
        validationResponse.errors = validation.errors.all();
      }
    }
    return validationResponse;
  };
  
  export const allFieldsValidation = (data) => {
    const validation = new Validator(data, rules);
    const validationResponse = {isValid: validation.passes()};
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
    return validationResponse;
  };
  