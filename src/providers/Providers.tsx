import React, { FC, ReactNode } from "react";
import { MdeProvider } from "./MdeProvider";
// import { ModalProvider } from "./ModalProvider";
import { ModalElmsRefProvider } from "./ModalProvider_ver2";
import { CardViewProvider } from "./CardViewProvider";
import { Provider } from "react-redux";
import { store } from "./store";


interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
      <Provider store={store}>
        {/* <ModalProvider> */}
        <ModalElmsRefProvider>
          <CardViewProvider>
            <MdeProvider>
                {children}
            </MdeProvider>
          </CardViewProvider>
        </ModalElmsRefProvider>
        {/* </ModalProvider> */}
      </Provider>
  );
};