const { PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

module.exports = (phase) => {


  switch (phase) {
      case PHASE_DEVELOPMENT_SERVER:
          return {
              env: {
                  access_Token: "xyz",
                  Account_Password: "abc",
              }
          }
      case PHASE_PRODUCTION_SERVER:
          return {
              env: {
                  access_Token: "xyz",
                  Account_Password: "abc",
              }
          }

      case PHASE_PRODUCTION_BUILD:
          return {
              env: {
                  access_Token: "xyz",
                  Account_Password: "abc",
              }
          }
      case PHASE_EXPORT:
          return {
              env: {
                  access_Token: "xyz",
                  Account_Password: "abc",
              }
          }

  }


}