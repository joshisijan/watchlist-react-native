import React, { useReducer } from "react";

export default ({ reducer, actions, initialState }) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let bindActions = {};

    for (let key in actions) {
      bindActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };
  return { Context, Provider };
};
