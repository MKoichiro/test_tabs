import React, { ReactNode } from "react";
import { AllTodosProvider } from "./AllTodosProvider";
import { MdeProvider } from "./MdeProvider";

export const Providers = ({children}: {children: ReactNode}) => {

  return (
    <AllTodosProvider>
      <MdeProvider>
        {children}
      </MdeProvider>
    </AllTodosProvider>
  );

};