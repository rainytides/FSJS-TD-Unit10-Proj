import React from "react";

const authUserContext = React.createContext();

export const AuthProvider = authUserContext.Provider;
export const AuthConsumer = authUserContext.Consumer;

//Set up the Context API Provider & Consumer to be used for making authenticated user information available throughout the app