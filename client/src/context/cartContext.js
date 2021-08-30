import { createContext } from "react";

const cartContext = createContext({
    items: [],
  setItems: () => {}
});

export default cartContext;