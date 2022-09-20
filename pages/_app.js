import "../styles/Icomoon.css";
import "../styles/globals.css";
import "../styles/animate.min.css";
import { Provider } from "react-redux";
import store from "../Redux/store";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "../Reducer/reducer";
import Script from 'next/script'

export const UserContext = createContext();

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

    <Script src="./script.js" strategy="beforeInteractive"/>
      return (
    <Provider store={store}>
      <UserContext.Provider value={{ state, dispatch }}>
        <div id="modal_overlays"></div>
        <Component {...pageProps} />
      </UserContext.Provider>
    </Provider>
    );
}

    export default MyApp;
