import { useState, createContext, useContext } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = (product, findProduct) => {
    if (findProduct) {
      setBasket(
        basket.filter((basket_item) => basket_item._id !== product._id)
      );
    } else {
      setBasket([...basket, product]);
    }
  };

  const removeFromBasket = (product) => {
    setBasket(basket.filter((basket_item) => basket_item._id !== product._id));
  };

  const basketEmpty = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, basketEmpty }}
    >
      {children}
    </BasketContext.Provider>
  );
};

const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

export { useBasket };
