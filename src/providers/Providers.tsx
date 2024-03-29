import React, { FC, ReactNode } from "react";
import { AllTodosProvider } from "./AllTodosProvider";
import { MdeProvider } from "./MdeProvider";
import { ModalProvider } from "./ModalProvider";


interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <AllTodosProvider>
      <MdeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </MdeProvider>
    </AllTodosProvider>
  );

};