import React, { FC, ReactNode } from "react";
import { Mde } from "./context_api/Mde";
import { ModalElmsRef } from "./context_api/ModalElmsRef";
import { CardView } from "./context_api/CardView";
import { Provider } from "react-redux";
import { store } from "./redux/store";


interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
      <Provider store={store}>
        <ModalElmsRef>
          <CardView>
            <Mde>
              {children}
            </Mde>
          </CardView>
        </ModalElmsRef>
      </Provider>
  );
};