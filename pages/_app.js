import "../styles/Icomoon.css";
import "../styles/globals.css";
import "../styles/animate.min.css";
import { Provider } from "react-redux";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith/isomorphic";
import { createContext, useReducer } from "react";
import Head from "next/head";
import store from "../Redux/store";
import { initialState, reducer } from "../Reducer/reducer";

export const UserContext = createContext();

function MyApp({ Component, pageProps,flagsmithState  }) {
  const [state, dispatch] = useReducer(reducer, initialState);
// console.log(flagsmith)
  return (
    <>
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>

      <Provider store={store}>
        <UserContext.Provider value={{ state, dispatch }}>
          <Head>
            <title>Ventura</title>
            <link rel="shortcut icon" href="/images/fevicon.png" />
          </Head>

          <div id="modal_overlays"></div>
          <Component {...pageProps} />
        </UserContext.Provider>
      </Provider>
    </FlagsmithProvider>
    </>
  );
}


MyApp.getInitialProps = async () => {
  // this could be getStaticProps too depending on your build flow
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  await flagsmith.init({
   // fetches flags on the server
   environmentID: 'jwS9gq9YP3DhhqrvX8XZjy',
   //  identity: 'my_user_id', // optionaly specify the identity of the user to get their specific flags
   identity:"user",
   state:{},
   defaultFlags:{timer:60,name:"saif",},
   traits:{otpTimer:60},
  //  onChange: (oldFlags, params) => {
  //   const { isFromServer } = params;
  // },

  });
  return { flagsmithState: flagsmith.getState() };
 };
 


export default MyApp;
