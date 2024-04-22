import React, { FC, ReactNode } from "react";
import { Mde } from "./Mde";
import { ModalElmsRef } from "./ModalElmsRef";
import { CardView } from "./CardView";
import { Provider } from "react-redux";
import { store } from "./store";


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