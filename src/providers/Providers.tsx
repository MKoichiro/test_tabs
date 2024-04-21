import React, { FC, ReactNode } from "react";
import { MdeProvider } from "./MdeProvider";
import { ModalProvider } from "./ModalProvider";
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
        <ModalProvider>
          <CardViewProvider>
            <MdeProvider>
                {children}
            </MdeProvider>
          </CardViewProvider>
        </ModalProvider>
      </Provider>
  );
};