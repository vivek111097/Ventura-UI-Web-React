import { getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Router, { useRouter } from "next/router";

// const router = useRouter();
import AxiosInstance from "../../../../../Api/Axios/axios";
const firebaseConfig = {
  apiKey: "AIzaSyCrDQB-Q-azf7CSp1g63-_u3dBdGgX09Zk",
  authDomain: "ventura-2-0.firebaseapp.com",
  projectId: "ventura-2-0",
  storageBucket: "ventura-2-0.appspot.com",
  messagingSenderId: "307487445108",
  appId: "1:307487445108:web:6ed9f88fa138e1c3eac121",
  measurementId: "G-TSRZ2QD49F",
};

const app = initializeApp({ ...firebaseConfig });
export default app;

const auth = getAuth(app);
console.log(getApp());
auth.languageCode = "it";
//   window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
//     'size': 'invisible',
//     'callback': (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.

//     }
//   }, auth);
const provider = new GoogleAuthProvider();
console.log(provider, "provider");
// export const signInWithGoogle =async () =>
//   signInWithPopup(auth, provider)
//     .then((result) => {
//     //   // This gives you a Google Access Token. You can use it to access the Google API.
//     //   const credential = GoogleAuthProvider.credentialFromResult(result);
//       console.log(result);
//     //   const token = credential.accessToken;
//       // The signed-in user info.
//     //   const user = result.user;
//     //  return user.email
//       // ...
//     })
//     .catch((error) => {
//         console.log(error)
//       // Handle Errors here.
//     //   const errorCode = error.code;
//     //   const errorMessage = error.message;
//     //   // The email of the user's account used.
//     //   const email = error.customData.email;
//     //   // The AuthCredential type that was used.
//     //   const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
    export const signInWithGoogle=async()=>{
        try {
          
const userData=await signInWithPopup(auth,provider)
const response= userData.user;



const APIData = {
    email: response.email,
  };
  console.log(APIData);
  const getData = await AxiosInstance.post("/signup/user/email", {...APIData}, {
    headers: {
      session_id:"93a219b5-40b2-44d2-af55-0b9ba642d77a" 
    //   props.session_id,
    },
  });
  console.log(getData)
  const res = await getData.data;
      if (getData.status == 200) {
        console.log(res);
Router.push("/co/welcome")
      } else {
        // props.toggleModal();
      }
// console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

export { auth };

