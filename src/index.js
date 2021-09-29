import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {API_KEY} from '../src/key';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// Create the http link
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

// Generate and set the header with the auth details
const authLink = setContext((_, { headers }) => {
  // get the authentication token from env variables if it exists
  const token = API_KEY;

  // return the headers to the context so httpLink can read them
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
      }
  }
});

// Generate your client with the authLink and httpLink
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
