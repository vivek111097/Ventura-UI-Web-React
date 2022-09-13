// Validating PAN Number

// Defining Regex for PAN Number
const PANRegex = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);

// Defining Regex for Individuals PAN Number
const IndividualPANRegex = new RegExp(
  /^([a-zA-Z]){3}([pP]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/
);

export const validatePAN = (pan) => {
  console.log(pan)
  // Checking If PAN is Valid or Not
  if (PANRegex.test(pan)) {
    // Checking If Individual PAN is Valid or Not
    if (IndividualPANRegex.test(pan)) {
      console.log(true)
      return true;
    } else {
      // return error message if string is not valid
      return "Only Individuals pan is allowed ,so 4th letter should be P";
    }
  } else {
    return "Invalid PAN Card "; //return false for valid string
  }
};


export const validatePANOrAddhar = (pan) => {
  console.log(pan)

  if (Number.isInteger(parseInt(pan[0]))) {
    console.log('Aaadhar number')

  }
  else {
    const validation_msg = validatePAN(pan)
    console.log("PAN Number")
    return validation_msg
  }
};