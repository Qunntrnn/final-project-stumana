import _ from "lodash";

const camelCaseToWords = (input) => {
  return input.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const getValidationErrorMessage = (field, type, extra = {}) => {
  const objName = camelCaseToWords(field);
  let errorMessage;

  switch (type) {
    case "REQUIRED":
      errorMessage = `${objName} is required`;
      break;
    case "LENGTH_TOO_SHORT":
      errorMessage = `${objName} is too short. Min length is ${extra.minLength}`;
      break;
    case "LENGTH_TOO_LONG":
      errorMessage = `${objName} is too long. Max length is ${extra.maxLength}`;
      break;
    case "USED_BY_ANOTHER_ACCOUNT":
      errorMessage = `The ${objName} is already in use by another account`;
      break;
    case "INVALID_DATA_TYPE":
      errorMessage = `Invalid data type of ${objName}`;
      break;
    case "ALREADY_EXISTS":
      errorMessage = `${objName} already exists`;
      break;
    case "NOT_FOUND":
      errorMessage = `${objName} not found`;
      break;
    case "MIN":
      errorMessage = `${objName} is too small. Min value is ${extra.min}`;
      break;
    case "MAX":
      errorMessage = `${objName} is too big. Max value is ${extra.max}`;
      break;
    default:
      errorMessage = `Invalid ${objName}`;
      break;
  }

  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

const errorMessage = getValidationErrorMessage("fieldName", "REQUIRED");
console.log(errorMessage);
