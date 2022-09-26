// Validating PAN Number
const PANRegex = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);

// Defining Regex for Individuals PAN Number

const IndividualPANRegex = new RegExp(
  /^([a-zA-Z]){3}([pP]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/
);

export const validatePAN = (pan) => {
  // Checking If PAN is Valid or Not
  if (PANRegex.test(pan)) {
    // Checking If Individual PAN is Valid or Not
    if (IndividualPANRegex.test(pan)) {
      return {
        validated: true,
        responceType: "success",
        icon: false,
        msg: "valid Pan",
      };
    } else {
      // return error message if string is not valid
      return {
        validated: false,
        responceType: "error",
        icon: false,
        buttonText: "Contact us",
        content:
          "Currently NRI customers can’t open an account online. To know more about Ventura’s NRI offerings and policies, please contact our team.",
        msg: "NRI demat account",
      };
    }
  } else {
    return {
      validated: false,
      responceType: "error",
      icon: true,
      content: "Please try again or enter another PAN.",
      buttonText: "Enter PAN",
      msg: "Invalid Pan",
    };
  }
};

export const validatePANOrAddhar = (pan_Or_Aadhar) => {
  console.log(pan_Or_Aadhar);

  if (Number.isInteger(parseInt(pan_Or_Aadhar[0]))) {
    console.log("Aaadhar number");
    if (pan_Or_Aadhar.length < 12) {
      console.log("Invalid Aaadhar number");
      return{
        type:"A",
        valid:false
      }
     
    }else{
      return {
        type: "A",
        valid: true,
      };
    }

  } else {
    if (PANRegex.test(pan_Or_Aadhar)) {
      // Checking If Individual PAN is Valid or Not
      if (IndividualPANRegex.test(pan_Or_Aadhar)) {
        console.log("Valid PAN");
        return {
          type: "P",
          valid: true,
        };
      } else {
        // return error message if string is not valid
        console.log("NRI");
        return{
          type:"P",
          valid:false
        }
      }
    } else {
      console.log("InValid PAN");
      return {
        type: "P",
        valid: false,
      };
    }
  }
};
