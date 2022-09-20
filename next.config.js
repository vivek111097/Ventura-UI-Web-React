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
                //baseUrl:"https://kyc-stage.ventura1.com/onboarding/v2"
                baseUrl: "https://kyc-qa.ventura1.com/onboarding/v2"
              }
          }
      case PHASE_PRODUCTION_SERVER:
          return {
             env: {
                // baseUrl:"https://kyc-stage.ventura1.com/onboarding/v2"
                baseUrl: "https://kyc-qa.ventura1.com/onboarding/v2"

              }
          }

      case PHASE_PRODUCTION_BUILD:
          return {
            env: {
                // baseUrl:"https://kyc-stage.ventura1.com/onboarding/v2"
                baseUrl: "https://kyc-qa.ventura1.com/onboarding/v2"
              }
          }
      case PHASE_EXPORT:
          return {
            env: {
                // baseUrl:"https://kyc-stage.ventura1.com/onboarding/v2"
                baseUrl: "https://kyc-qa.ventura1.com/onboarding/v2"
              }
          }

  }


}

// module.exports = {
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
  
// }