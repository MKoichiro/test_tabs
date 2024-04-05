import React, { FC, ReactNode } from "react";
import { AllTodosProvider } from "./AllTodosProvider";
import { MdeProvider } from "./MdeProvider";
import { ModalProvider } from "./ModalProvider";
import { Categories } from "../components/main/tabs/edit_categories_modal/Categories";
import { CategoriesProvider } from "./CategoriesProvider";


interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <AllTodosProvider>
      <CategoriesProvider>
      <MdeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </MdeProvider>
      </CategoriesProvider>
    </AllTodosProvider>
  );

};