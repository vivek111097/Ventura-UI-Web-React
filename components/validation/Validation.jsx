// Validating PAN Number
const PANRegex = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);

// Defining Regex for Individuals PAN Number

const IndividualPANRegex = new RegExp(
  /^([a-zA-Z]){3}([pP]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/
);

export const validatePAN = (pan) => {
  console.log(pan);
  // Checking If PAN is Valid or Not
  if (PANRegex.test(pan)) {
    // Checking If Individual PAN is Valid or Not
    if (IndividualPANRegex.test(pan)) {
      return { validated: true, msg: "valid Pan" };
    } else {
      // return error message if string is not valid
      return { validated: false, msg: "NRI demat account" };
    }
  } else {
    return { validated: false, msg: "Invalid Pan" };
  }
};

export const validatePANOrAddhar = (pan) => {
  console.log(pan);

  if (Number.isInteger(parseInt(pan[0]))) {
    console.log("Aaadhar number");
  } else {
    const validation_msg = validatePAN(pan);
    console.log("PAN Number");
    return validation_msg;
  }
};
