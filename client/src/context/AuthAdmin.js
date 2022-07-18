import { createContext, useContext } from "react";

const AdminContext = createContext();

export const AuthAdminProvider = ({ children }) => {
  const authAdmin = "pmustafa0@gmail.com";

  return (
    <AdminContext.Provider value={{ authAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within a AuthAdminProvider");
  }
  return context;
};

export { useAdmin };
