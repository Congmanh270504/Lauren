"use client";

import { Provider } from "react-redux";
import { store } from "./state/store";
import { Toaster } from "sonner";

interface ClientProviderProps {
  children: React.ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster richColors position="bottom-right" />
    </Provider>
  );
};

export default ClientProvider;
